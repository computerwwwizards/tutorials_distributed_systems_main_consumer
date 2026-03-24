import type { ComponentType } from "react";
import { Link } from "react-router";

type ComponentContent<PropsType = any> = {
  name: string;
  Component?: ComponentType;
  props?: PropsType;
}

export default async function createAppCard(_ctx: any, _meta?: any): Promise<ComponentContent> {
  return {
    name: "test",
    Component: () => (
      <article style={{ border: '2px solid red' }}>
        <Link to="/test">To Test</Link>
      </article>
    ),
    props: {},
  };
}