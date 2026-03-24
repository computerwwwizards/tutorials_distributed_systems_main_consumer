import { use } from "react";
import type { ComponentContent } from "../(global)/-config/remote-service/types";
import DefaultComponent from "./DefaultComponent";

interface AppCardArgs {
  appCardPromise: Promise<ComponentContent<any>>
}

export default function AppCard({ appCardPromise }: AppCardArgs) {
  const { Component, props } = use(appCardPromise)

  if (!Component) return "Not disponible :("

  return (
    <div>
      <Component {...props} />
    </div>
  )
}
