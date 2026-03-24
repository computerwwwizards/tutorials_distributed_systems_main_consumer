import { use } from "react";
import type { ComponentContent } from "../(global)/-config/remote-service/types";
import DefaultComponent from "./DefaultComponent";

interface FastAccessCardsArgs {
  fastAccessCardsPromise: Promise<{ data: Array<ComponentContent<any>>; name: string }>
}

export default function FastAccessCards({ fastAccessCardsPromise }: FastAccessCardsArgs) {
  const fastAccessCards = use(fastAccessCardsPromise)

  return (
    <div>
      {fastAccessCards.data.map(({ name, Component = DefaultComponent, props }, index) => (
        <div key={index}>
          <p>{name}</p>
          <Component {...props} />
        </div>
      ))}
    </div>
  )
}
