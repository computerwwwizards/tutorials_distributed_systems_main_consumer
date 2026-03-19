import type { GloablCtx } from "../types"

export default function plugin(){
  throw new Error('Not implemented')
}

if(import.meta.env.DEV){
  plugin.mock = function(ctx: GloablCtx){
    ctx
      .bind('user-access-type', {
        provider(resolvedDeps, ctx, meta) {
          return {
            getRole() {
              return Promise.resolve('user')
            },
            getTier() {
              return Promise.resolve('free')
            },
            isLegacyUser() {
              return Promise.resolve(true)
            },
          }
        },
      })
  }
}