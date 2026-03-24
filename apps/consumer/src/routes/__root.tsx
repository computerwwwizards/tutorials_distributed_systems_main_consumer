import { BasicContainer } from "@computerwwwizards/dependency-injection";
import { createBrowserRouter, Outlet, RouterContextProvider, createContext, useLoaderData } from "react-router";
import OnError from "../Error";
import type { GlobalServices } from "./(global)/-config/types";
import type { ComponentContent } from "./(global)/-config/remote-service/types";
import FastAccessCards from "./-components/FastAccessCards";
import AppCard from "./-components/AppCard";

export const rootContext = createContext<BasicContainer<any>>(null!)

export const createRouter = function (ctx: BasicContainer<GlobalServices>) {
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
      children: [
        {
          index: true,
          async lazy() {
            return {
              loader: async () => {
                const remoteService = ctx.get('remote-service')
                const [createFastAccessCards, createAppCards] = await Promise.all([
                  remoteService.getCreateFastAccessCards(),
                  remoteService.getCreateAppCards(),
                ])

                const fastAccessCardsPromises = createFastAccessCards.map((createFastAccessCard) => createFastAccessCard(ctx))
                const appCardPromises = createAppCards.map((createAppCard) => createAppCard(ctx))

                return { fastAccessCardsPromises, appCardPromises }
              },
              Component: () => {
                const { fastAccessCardsPromises, appCardPromises } = useLoaderData<{
                  fastAccessCardsPromises: Promise<{ data: Array<ComponentContent<any>>; name: string }>[]
                  appCardPromises: Promise<ComponentContent<any>>[]
                }>()

                return (
                  <div>
                    <h2>Top apps</h2>
                    {
                      fastAccessCardsPromises.map((fastAccessCardsPromise, index) => (
                        <FastAccessCards key={index} fastAccessCardsPromise={fastAccessCardsPromise} />
                      ))
                    }
                    <h4>Products</h4>
                    {
                      appCardPromises.map((appCardPromise, index) => (
                        <AppCard key={index} appCardPromise={appCardPromise} />
                      ))
                    }
                  </div>
                )
              }
            }
          }
        }
      ]
    }
  ],
    {
      async patchRoutesOnNavigation(args) {
        const routeService = ctx.get("remote-service")
        const patchOnNavigation = await routeService.getPatchOnNavigationByPath(args.path)
        await patchOnNavigation(args, { ctx })
      },
      async getContext() {
        const context = new RouterContextProvider()

        context.set(rootContext, ctx)

        return context;
      },
    })
}