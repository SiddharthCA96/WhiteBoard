import React, { useReducer } from "react";
import { TOOL_ITEMS } from "../../constants";
import boardContext from "./board-context";
import rough from "roughjs/bin/rough";

const gen = rough.generator();

//board reducer
const boardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TOOL":
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    case "DRAW_DOWN":
        //get the payload
        const {clientX,clientY}=action.payload
        //create the new element
        const newEle ={
            id:state.elements.length,
            x1:clientX,
            y1:clientY,
            x2:clientX,
            y2:clientY,
            roughEle:gen.line(clientX,clientY,clientX,clientY),
        };
        //push this element to state elements
        const prevElements=state.elements;
        return{
            //updating the state
            ...state,
            elements:[...prevElements,newEle]
        }
    default:
      return state;
  }
};

//initial state of the board
const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  elements: [],
};
const BoardProvider = ({ children }) => {
  //getting the state from store
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );
  //to set the elements (state of the element)

  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    //dispatch th action to change the state of the elements
    dispatchBoardAction({
      type: "DRAW_DOWN",
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const handleToolItemClick = (tool) => {
    //console.log(tool);
    dispatchBoardAction({
      type: "CHANGE_TOOL",
      payload: {
        tool,
      },
    });
  };

  //OBJECT USED BY ALL CONSUMERS OF THIS CONTEXT
  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardContext.elements,
    handleToolItemClick,
    boardMouseDownHandler,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
