import { DefaultAuthStatus, IAppService } from '../top-level-container.types';

export abstract class BaseAppService implements IAppService{
  abstract getAuthStatus<Meta = any>(meta?: Meta | undefined): Promise<DefaultAuthStatus>;
  abstract redirectToLogin<Meta = any>(meta?: Meta): Promise<void>;
  async renderMainApp<Meta = any>(meta?: Meta): Promise<void>{
    const root = document.body.querySelector("#root")
    if(!root)
      throw new Error('root element does not exist');
  
    const [{ createRoot }, { default: App }] = await Promise.all([
      import('react-dom/client'),
      import('../App')
    ]);

    createRoot(root).render(<App />)
  }
  async init(){
    const current: IAppService = this;

    await current.registerStartHandlers?.();

    switch (await current.getAuthStatus()){
      case 'many-users':
        if(current.redirectToChooseUser){
          current.redirectToChooseUser();
          break;
        }
        else
          throw new Error('Redirect to choose user must be implemented if many users is possible');
      case 'single-user':
        current.renderMainApp();
        break;
      default:
      case 'no-user':
        current.redirectToLogin();
        break;
    }

    await current.registerEndHandlers?.();
  }
}
