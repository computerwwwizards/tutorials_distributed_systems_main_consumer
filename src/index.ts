import { BasicContainer } from "@computerwwwizards/dependency-injection";
import { TopLevelContainerServices, TopLevelCtx } from "./index.types";
import mainPlugin from './top-level-container';

const topLevelCtx = new BasicContainer<TopLevelContainerServices>()
console.log(import.meta.env.PUBLIC_IS_GLOBAL_MOCK_ON)

if(import.meta.env.PUBLIC_IS_GLOBAL_MOCK_ON)
  topLevelCtx.useMocks()

topLevelCtx.use(mainPlugin);

topLevelCtx.get('app-service').init();