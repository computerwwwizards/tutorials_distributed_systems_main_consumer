import type { Root } from 'react-dom/client';
import type { DefaultAuthStatus, IAppService } from '../top-level-container.types';


export abstract class BaseAppService implements IAppService {
  /**
   * React root exist beacause if the fallback already rendered we can encounter an 
   * error if we try to create again the root when rednering the main app. for that
   * reason we MUST reuse the already created root
   */
  private reactRoot?: Root;
  abstract getAuthStatus<Meta = any>(meta?: Meta | undefined): Promise<DefaultAuthStatus>;
  abstract redirectToLogin<Meta = any>(meta?: Meta): Promise<void>;

  protected getHTMLRootElement() {
    const HTMLRootElement = document.body.querySelector("#root")
    if (!HTMLRootElement)
      throw new Error('root element does not exist');

    return HTMLRootElement
  }

  protected async getBaseApp() {
    const root = this.getHTMLRootElement()

    const [{ createRoot }, { default: App }] = await Promise.all([
      import('react-dom/client'),
      import('../App')
    ]);

    return {
      createRoot: () => {
        this.reactRoot ??= createRoot(root)
        return this.reactRoot;
      },
      App
    }
  }

  async renderMainApp<Meta = any>(meta?: Meta): Promise<void> {
    const { App, createRoot } = await this.getBaseApp()

    createRoot().render(<App />)
  }

  async renderOnError(error: any): Promise<void> {
    const root = this.getHTMLRootElement()

    const [{ createRoot }, { default: App }] = await Promise.all([
      import('react-dom/client'),
      import('../Error')
    ]);

    this.reactRoot ??= createRoot(root);

    this.reactRoot.render(<App />)
  }

  async renderFallback(): Promise<void> {
    const root = this.getHTMLRootElement()

    const [{ createRoot }, { default: App }] = await Promise.all([
      import('react-dom/client'),
      import('../Fallback')
    ]);
    this.reactRoot ??= createRoot(root)

    this.reactRoot.render(<App />)
  }
  async init() {
    try {
      const current: IAppService = this;
      this.renderFallback();

      await current.registerStartHandlers?.();

      switch (await current.getAuthStatus()) {
        case 'many-users':
          if (current.redirectToChooseUser) {
            await current.redirectToChooseUser();
            break;
          }
          else
            throw new Error('Redirect to choose user must be implemented if many users is possible');
        case 'single-user':
          await current.renderMainApp();
          break;
        default:
        case 'no-user':
          await current.redirectToLogin();
          break;
      }

      await current.registerEndHandlers?.();
    } catch (error: any) {
      this.renderOnError(error)
    }

  }
}
