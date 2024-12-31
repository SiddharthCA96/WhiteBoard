import { createContext } from "react";


//CREATING BOARD CONTEXT
const boardContext=createContext({
    activeToolItem: "",
    elements: [],
    boardMouseDownHandler:()=>{},
    handleToolItemClick:()=>{},
});

export default boardContext;
