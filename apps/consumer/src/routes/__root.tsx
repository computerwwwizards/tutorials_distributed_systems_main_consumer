import { BasicContainer } from "@computerwwwizards/dependency-injection";
import { createBrowserRouter, Outlet, RouterContextProvider, createContext } from "react-router";
import type { PatchRoutesService } from "./(global)/-config/patch-routes/types";
import { getInstance } from '@module-federation/enhanced/runtime'
import OnError from "../Error";

export const rootContext = createContext<BasicContainer<any>>(null!)

export const createRouter = function <Services extends {
  "route-service": PatchRoutesService
}>(ctx: BasicContainer<Services>) {
  const mf = getInstance()

  return createBrowserRouter([
    {
      path: '/',
      id: 'root',
      lazy: {
        middleware: async () => [(await import('./(global)/middleware')).default],
      },
      Component: () => {
        return <Outlet />
      },
      errorElement: <OnError />,
      async loader() {
        const routerService = ctx.get('route-service')
        const { default: patchOnNavigation } = await mf?.loadRemote('mf_test_provider/patch-on-navigation') as any
        routerService.register(patchOnNavigation)
      },
      children: [
        {
          index: true,
          async lazy() {
            const { default: createAppCard } = await mf?.loadRemote('mf_test_provider/create-app-card') as any
            const data = createAppCard(ctx)
            return {
              Component: () => <data.Component />
            }
          }
        }
      ]
    }
  ],
    {
      async patchRoutesOnNavigation(...args) {

        //TODO: evalaute this to be a promise
        const routeService = ctx.get("route-service")
        await routeService.execute(...args)
      },
      async getContext() {
        const context = new RouterContextProvider()

        context.set(rootContext, ctx)

        return context;
      },
    })
}