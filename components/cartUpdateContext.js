import { createContext } from 'react';
const cartUpdateContext = createContext({cartQTY:0,setcartQTY:()=>{},setCartData:()=>{}});
export default cartUpdateContext;