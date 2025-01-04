import { createContext } from "react";


//CREATING BOARD CONTEXT
const boardContext=createContext({
    activeToolItem: "",
    elements: [],
    toolActionType: "",
    boardMouseDownHandler:()=>{},
    handleToolItemClick:()=>{},
    boardMouseMoveHandler:()=>{},
    boardMouseUpHandler:()=>{},
    textAreaBlurHandler:()=>{},
});

export default boardContext;
