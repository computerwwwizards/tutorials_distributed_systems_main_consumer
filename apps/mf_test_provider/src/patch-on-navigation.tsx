import { PatchRoutesOnNavigationFunction } from "react-router";

const patchOnNavigation: PatchRoutesOnNavigationFunction =  function patchOnNavigation({
  patch,
  path
}){
  if(path.startsWith('/test')){
    patch('root', [{
      path: '/test',
      Component: ()=>"I am a test module federation"
    }])
  }
}

export default patchOnNavigation;