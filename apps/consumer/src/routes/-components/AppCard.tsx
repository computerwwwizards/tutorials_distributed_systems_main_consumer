import { use } from "react";
import type { ComponentContent } from "../(global)/-config/remote-service/types";
import DefaultComponent from "./DefaultComponent";

interface AppCardArgs {
  appCardPromise: Promise<ComponentContent<any>>
}

export default function AppCard({ appCardPromise }: AppCardArgs) {
  const { name, Component = DefaultComponent, props } = use(appCardPromise)

  return (
    <div>
      <p>{name}</p>
      <Component {...props} />
    </div>
  )
}
