import { RouterProvider } from "react-router"
import type { TopLevelCtx } from "./index.types"
import { createRouter } from "./routes/__root"
import { useMemo } from "react"
import userAccesPlugin from  './routes/(global)/-config/user-acces-type/plugin'
import { BasicContainer } from "@computerwwwizards/dependency-injection"
import type { GlobalServices } from "./routes/(global)/-config/types"
import routeServicePlugin from "./routes/(global)/-config/patch-routes/plugin"
export interface AppProps{
  topLevelCtx?: TopLevelCtx
}

export default function App({}: AppProps){
  const globalContainer = useMemo(()=>{
    const container = new BasicContainer<GlobalServices>();

    if(import.meta.env.PUBLIC_IS_GLOBAL_MOCK_ON)
      container.useMocks()

  container
    .use(routeServicePlugin)
    .use(userAccesPlugin)

    return container

  }, [])
  return <RouterProvider router={createRouter(globalContainer)} />
}