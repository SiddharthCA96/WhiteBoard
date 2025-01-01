import React, { useReducer } from "react";
import { BOARD_ACTIONS, TOOL_ACTIONS_TYPES, TOOL_ITEMS } from "../../constants";
import boardContext from "./board-context";
import rough from "roughjs/bin/rough";
import { createRoughElement } from "../utils/element";

const gen = rough.generator();

//board reducer
const boardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TOOL": {
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    case "DRAW_DOWN": {
      //get the payload
      const { clientX, clientY } = action.payload;
      //create the new element
      const newEle = createRoughElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem }
      );
      //push this element to state elements
      const prevElements = state.elements;
      return {
        //updating the state
        ...state,
        //Declare the toolaction type
        toolActionType: TOOL_ACTIONS_TYPES.DRAWING,
        //update the elements
        elements: [...prevElements, newEle],
      };
    }
    case "DRAW_MOVE": {
      //get the payload
      const { clientX, clientY } = action.payload;

      //get the prev elements
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      const { x1, y1 } = newElements[index];

      //create the newelement
      const newElement = createRoughElement(index, x1, y1, clientX, clientY, {
        type: state.activeToolItem,
      });

      newElements[index]=newElement;
      return {
        ...state,
        elements: newElements,
      };
    }
    case "DRAW_UP": {
      return {
        ...state,
        toolActionType: TOOL_ACTIONS_TYPES.NONE,
      };
    }
    default:
      return state;
  }
};

//initial state of the board
const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  toolActionType: TOOL_ACTIONS_TYPES.NONE,
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
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;
    //dispatch th action to change the state of the elements
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_MOVE,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  //just change the toolaction type to none
  const boardMouseUpHandler = () => {
    //dispatch th action to change the state of the elements
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_UP,
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
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    handleToolItemClick,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
