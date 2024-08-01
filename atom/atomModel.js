import { atom } from "recoil";
export const modelState = atom({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });
  export const postidState = atom({
    key: 'postidstate', // unique ID (with respect to other atoms/selectors)
    default: "id", // default value (aka initial value)
  });