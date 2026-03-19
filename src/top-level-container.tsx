import { TopLevelCtx } from "./index.types";
import { BaseAppService } from "./services/base-app";
import { DefaultAuthStatus } from "./top-level-container.types";


export default function plugin(ctx: TopLevelCtx){
  ctx.bind('app-service', {
    provider(){
      throw new Error('Not implemented')
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

  