import type { TopLevelCtx } from "./index.types"

export interface AppProps{
  topLevelCtx?: TopLevelCtx
}

export default function App({}: AppProps){
  return 'This is the main App'
}