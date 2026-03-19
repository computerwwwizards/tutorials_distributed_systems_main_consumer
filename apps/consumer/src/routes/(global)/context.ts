import { createContext } from "react-router";
import type { GloablCtx } from "./-config/types";

export const globalContext = createContext<GloablCtx>(null!)