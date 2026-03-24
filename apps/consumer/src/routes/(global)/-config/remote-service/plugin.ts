import type { PatchRoutesOnNavigationFunctionArgs } from "react-router";
import type { GloablCtx } from "../types";
import type { AppArgs, ComponentContent } from "./types";
import { getInstance } from "@module-federation/enhanced/runtime";

export default function plugin(ctx: GloablCtx) {
  ctx.
    bind("remote-service", {
      provider() {
        const mf = getInstance()
        return new class {
          async getPatchOnNavigationByPath(path: string) {

            // TODO: find remote to load by path

            const { default: patchOnNavigation } = await mf?.loadRemote('mf_test_provider/patch-on-navigation') as any

            return patchOnNavigation
          }
          async getCreateAppCards() {

            // TODO: get all createAppCards

            const { default: createAppCard } = await mf?.loadRemote('mf_test_provider/create-app-card') as any

            return [
              createAppCard
            ]
          }
          async getCreateFastAccessCards() {
            return [
              async function (): Promise<{ data: Array<ComponentContent<any>>; name: string }> {
                return {
                  data: [
                    {
                      name: "First fast card",
                      Component: () => "second app card",
                      props: {}
                    }
                  ],
                  name: "module 1"
                }
              }
            ]
          }
          async getCreateHeaderDirectAccesses() {
            return [
              async function (): Promise<ComponentContent<any>> {
                return {
                  name: "",
                  Component: () => "first header direct access",
                  props: {}
                }
              }
            ]
          }
          async getCreateCarouselComponents() {
            return [
              async function (): Promise<{ name: string, order: number, data: Array<ComponentContent<any>> }> {

                return {
                  data: [
                    {
                      name: "",
                      Component: () => "first carousel component",
                      props: {}
                    }
                  ],
                  name: "",
                  order: 1
                }
              }
            ]
          }
        }
      },
    })
}

if (import.meta.env.DEV) {
  plugin.mock = function (ctx: GloablCtx) {
    ctx
      .bind('remote-service', {
        provider() {
          return new class {
            async getPatchOnNavigationByPath() {
              return async function (_: PatchRoutesOnNavigationFunctionArgs, __: AppArgs) { }
            }
            async getCreateAppCards() {
              return [
                async function (): Promise<ComponentContent<any>> {
                  return {
                    name: "",
                    Component: () => "first app card",
                    props: {}
                  }
                }
              ]
            }
            async getCreateFastAccessCards() {
              return [
                async function (): Promise<{ data: Array<ComponentContent<any>>; name: string }> {
                  return {
                    data: [
                      {
                        name: "First fast card",
                        Component: () => "second app card",
                        props: {}
                      }
                    ],
                    name: "module 1"
                  }
                }
              ]
            }
            async getCreateHeaderDirectAccesses() {
              return [
                async function (): Promise<ComponentContent<any>> {
                  return {
                    name: "",
                    Component: () => "first header direct access",
                    props: {}
                  }
                }
              ]
            }
            async getCreateCarouselComponents() {
              return [
                async function (): Promise<{ name: string, order: number, data: Array<ComponentContent<any>> }> {

                  return {
                    data: [
                      {
                        name: "",
                        Component: () => "first carousel component",
                        props: {}
                      }
                    ],
                    name: "",
                    order: 1
                  }
                }
              ]
            }
          }
        },
      })
  }
}