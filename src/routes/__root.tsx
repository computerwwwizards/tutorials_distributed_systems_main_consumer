import { BasicContainer } from "@computerwwwizards/dependency-injection";
import { createBrowserRouter, Outlet, RouterContextProvider, createContext } from "react-router";
import type { PatchRoutesService } from "./(global)/-config/patch-routes/types";


export const rootContext = createContext<BasicContainer<any>>(null!)

export const createRouter = function<Services extends {
  "route-service": PatchRoutesService
}>(ctx: BasicContainer<Services>){


  return createBrowserRouter([
    {
      path: '/',
      id: 'root',
      lazy:{
        middleware: async()=>[(await import('./(global)/middleware')).default],
      },
      Component: ()=>{
        return <Outlet />
      }
    }
  ], 
  {
    async patchRoutesOnNavigation(...args){

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