import { createContext } from "react";


//CREATING BOARD CONTEXT
const boardContext=createContext({
    activeToolItem: "",
    elements: [],
    history: [[]],
    index: 0,
    toolActionType: "",
    boardMouseDownHandler:()=>{},
    handleToolItemClick:()=>{},
    boardMouseMoveHandler:()=>{},
    boardMouseUpHandler:()=>{},
    textAreaBlurHandler:()=>{},
    boardUndoHandler:()=>{},
    boardRedoHandler:()=>{},
});

export default boardContext;
