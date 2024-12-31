import { createContext } from "react";


//CREATING BOARD CONTEXT
const boardContext=createContext({
    activeToolItem: "",
    elements: [],
});

export default boardContext;
