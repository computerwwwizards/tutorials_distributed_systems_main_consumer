import { redirect, type MiddlewareFunction } from "react-router";
import { rootContext } from "../__root";


const middleware: MiddlewareFunction = async function({context ,request}, next){
  const globalCtx = context.get(rootContext)
  console.log(globalCtx)
  const userContainer = globalCtx.get('user-access-type')
  console.log('executing middleware')

  if(!request.url.includes('wizard-board'))
  if(await userContainer.isLegacyUser())
    throw redirect('/wizard-board')

  return await next()
}

export default middleware