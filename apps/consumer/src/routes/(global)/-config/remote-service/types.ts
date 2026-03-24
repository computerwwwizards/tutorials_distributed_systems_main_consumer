import type { BasicContainer, PlainObject } from "@computerwwwizards/dependency-injection";
import type { PatchRoutesOnNavigationFunctionArgs } from "react-router"
import type { ComponentType } from "react";

import type { GlobalServices } from "../types";

type AppArgs<T extends PlainObject = GlobalServices, Meta = any> = {
  ctx: BasicContainer<T>;
  meta?: Meta
}

type ComponentContent<PropsType = any> = {
  name: string;
  /**
  * If not specified, the shell will use its default Card component.
  **/
  Component?: ComponentType;
  /**
  * These props are merged with the default shell props.
  **/
  props?: PropsType;
}


interface RemoteService {
  getPatchOnNavigationByPath(path: string): (args: PatchRoutesOnNavigationFunctionArgs, appArgs: AppArgs) => Promise<void>

  getCreateAppCards(): <T extends PlainObject, Props = any, R = any>(ctx: BasicContainer<T>, meta?: R) => Promise<ComponentContent<Props>>

  getCreateFastAccessCards(): <T extends PlainObject, Props = any, R = any>(ctx: BasicContainer<T>, meta?: R) => Promise<{ data: Array<ComponentContent<Props>>; name: string }>

  getCreateHeaderDirectAccesses(): <T extends PlainObject, Props = any, R = any>(ctx: BasicContainer<T>, meta?: R) => Promise<ComponentContent<Props>>

  getCreateCarouselComponents(): <T extends PlainObject, Props = any, R = any>(ctx: BasicContainer<T>, meta?: R) => Promise<{ name: string, order: number, data: Array<ComponentContent<Props>> }>
}

declare module '../types.ts' {
  interface GlobalServices {
    'remote-service': RemoteService
  }
}