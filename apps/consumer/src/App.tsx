import { RouterProvider } from "react-router"
import type { TopLevelContainerServices, TopLevelCtx } from "./index.types"
import { createRouter } from "./routes/__root"
import { useMemo } from "react"
import userAccesPlugin from  './routes/(global)/-config/user-acces-type/plugin'
import { BasicChildContainer } from "@computerwwwizards/dependency-injection"
import type { GlobalServices } from "./routes/(global)/-config/types"
import routeServicePlugin from "./routes/(global)/-config/patch-routes/plugin"
export interface AppProps{
  topLevelCtx?: TopLevelCtx
}

export default function App({
  topLevelCtx
}: AppProps){
  const globalContainer = useMemo(()=>{
    const container = new BasicChildContainer<GlobalServices, TopLevelContainerServices>(
      topLevelCtx
    );

    if(import.meta.env.PUBLIC_IS_GLOBAL_MOCK_ON)
      container.useMocks()

  container
    .use(routeServicePlugin as any)
    .use(userAccesPlugin)

    return container

  }, [])
  return <RouterProvider router={createRouter(globalContainer as any)} />
}