// export const globalConfig = {
//   get text(){return "I am bad singleton"}
// }

const prevBadGlobalConfig = {
  get text(){return "I am bad singleton"}
 }

export let globalConfig = prevBadGlobalConfig

export const setGlobalConfig = (newInstance: typeof prevBadGlobalConfig)=>{
  globalConfig = newInstance
}