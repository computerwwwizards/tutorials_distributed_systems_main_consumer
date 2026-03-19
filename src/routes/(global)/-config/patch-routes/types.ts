import type { PatchRoutesOnNavigationFunction } from "react-router";

export interface PatchRoutesService{
  register(
    cb: (...args:Parameters<PatchRoutesOnNavigationFunction>)=>Promise<boolean>
  ): Promise<void>,
  execute(...args:Parameters<PatchRoutesOnNavigationFunction>): Promise<void>
}

declare module '../types.ts' {
  interface GlobalServices {
    'route-service': PatchRoutesService
  }
}