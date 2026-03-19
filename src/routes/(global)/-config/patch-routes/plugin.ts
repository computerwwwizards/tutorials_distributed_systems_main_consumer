import type { GloablCtx } from "../types"

export default function plugin(){
  throw new Error('Not implemented')
}

if(import.meta.env.DEV){
  plugin.mock = function(ctx: GloablCtx){
    ctx
      .bind('route-service', {
        provider() {
          return new class{
            private cbs = new Set<(...args: any)=>Promise<void>>([
              async ({patch})=>{
                patch('root', 
                   [{
                    path: '/wizard-board',
                    Component: ()=>"Helllooo"
                  }]
                )
              }
            ]);
            async execute(...args: any){
              this.cbs.forEach(cb=>cb(...args))
            }
            async register(cb: any){
              this.cbs.add(cb);
            }
          } 
        },
      })
  }
}