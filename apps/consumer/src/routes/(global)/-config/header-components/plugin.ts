import type { GloablCtx } from "../types"

export default function plugin(ctx: GloablCtx) {
  ctx.bind('header-components-service', {
    scope: 'singleton',
    provider() {
      return new class {
        getLogo() {
          return "logo"
        }
        getNavigation() {
          return "navigation"
        }
        getUserProfile() {
          return "user profile"
        }
      }
    }
  })
}

if (import.meta.env.DEV) {
  plugin.mock = function (ctx: GloablCtx) {
    ctx
      .bind('header-components-service', {
        scope: "singleton",
        provider() {
          return new class {
            getLogo() {
              return "logo"
            }
            getNavigation() {
              return "navigation"
            }
            getUserProfile() {
              return "user profile"
            }
          }
        },
      })
  }
}