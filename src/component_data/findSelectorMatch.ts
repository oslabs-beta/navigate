import { anyObject } from "../kObjects/__index";
export const findSelectorMatch = (obj1: anyObject, obj2: anyObject) => {
  let namespaceCount: number = 0;
  for(let key in obj2.selectors){
    if(obj2.selectors[key] === obj1.selectors[key]){
      if(obj1.selectors[key] !== obj2.namespace)
      return true;
      else namespaceCount++;
      if(namespaceCount > 1) return true;
    }
    else continue;
  }
  return false;
}