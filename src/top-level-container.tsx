import { 
  Auth0Client, 
  type ClientAuthorizationParams, 
  type ConnectAccountRedirectResult, 
  type RedirectLoginResult 
} from "@auth0/auth0-spa-js";
import type { TopLevelCtx } from "./index.types";
import { BaseAppService } from "./services/base-app";
import type { DefaultAuthStatus, IAppService } from "./top-level-container.types";

class Auth0AppService extends BaseAppService implements IAppService{
  constructor(private auth0Client: Auth0Client, private topLevelCtx: TopLevelCtx){
    super();
  }

  private deleteSearchParams(
    result: RedirectLoginResult<any> | ConnectAccountRedirectResult<any>
  ){
     window.history.replaceState(
      {}, 
      document.title, 
      result.appState?.target ?? window.location.pathname
    )
  }

  async registerStartHandlers(): Promise<void> {   
    if(!globalThis.location.search)
      return 

    const result = await this.auth0Client.handleRedirectCallback()
    
    this.deleteSearchParams(result)
    
  }
  async redirectToLogin<Meta = any>(meta?: Meta): Promise<void> {
    await this.auth0Client.loginWithRedirect()
  }
  async getAuthStatus<Meta = any>(meta?: Meta | undefined): Promise<DefaultAuthStatus> {
    const isAuth = await this.auth0Client.isAuthenticated()

    if(isAuth)
      return 'single-user'

    return 'no-user'
  }
  override async renderMainApp<Meta = any>(meta?: Meta): Promise<void> {
    const { App, createRoot } = await this.getBaseApp();

    createRoot()
      .render(<App topLevelCtx={this.topLevelCtx} />)
  }
}

export default function plugin(ctx: TopLevelCtx){
  ctx
    .bind('auth0', {
      scope: 'singleton',
      provider(){
        const authParams: ClientAuthorizationParams = {
          redirect_uri: window.location.origin
        };

        if(import.meta.env.PUBLIC_AUTH0_AUDIENCE)
          authParams.audience = import.meta.env.PUBLIC_AUTH0_AUDIENCE

        return new Auth0Client({
          clientId: import.meta.env.PUBLIC_AUTH0_CLIENT_ID,
          domain: import.meta.env.PUBLIC_AUTH0_DOMAIN,
          authorizationParams: authParams
        });
      }
    })
    .bind('app-service', {
      resolveDependencies(ctx) {
        return {
          'auth0': ctx.get('auth0')
        }
      },
      provider({ auth0 }){
        return new Auth0AppService(auth0, ctx);
      }
    })
}

if(import.meta.env.DEV)
  plugin.mock  = function(ctx: TopLevelCtx){
    ctx.bind('app-service', {
      provider(){
        return new class extends BaseAppService{
          getAuthStatus() {
            return Promise.resolve<DefaultAuthStatus>('single-user')  
          }
          redirectToLogin(){
            return Promise.resolve();
          }
        }
      }
    })
  }

  