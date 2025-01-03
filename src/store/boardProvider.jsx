import React, { useReducer } from "react";
import { BOARD_ACTIONS, TOOL_ACTIONS_TYPES, TOOL_ITEMS } from "../../constants";
import boardContext from "./board-context";
import rough from "roughjs/bin/rough";
import { createRoughElement, getSvgPathFromStroke } from "../utils/element";
import getStroke from "perfect-freehand";
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
      const { clientX, clientY, stroke, fill, size } = action.payload;
      //create the new element
      const newEle = createRoughElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem, stroke, fill, size }
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
      const { type } = newElements[index];

      //create the newelement based on type
      switch (type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          const { x1, y1, stroke, fill, size } = newElements[index];
          const newElement = createRoughElement(
            index,
            x1,
            y1,
            clientX,
            clientY,
            {
              type: state.activeToolItem,
              stroke,
              fill,
              size,
            }
          );
          newElements[index] = newElement;
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.BRUSH: {
          newElements[index].points = [
            ...newElements[index].points,
            { x: clientX, y: clientY },
          ];
          newElements[index].path = new Path2D(
            getSvgPathFromStroke(getStroke(newElements[index].points))
          );
          return {
            ...state,
            elements: newElements,
          };
        }
        default:
         throw new Error("Type not defined")
      }
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

  const boardMouseDownHandler = (event, toolboxState) => {
    const { clientX, clientY } = event;
    //dispatch th action to change the state of the elements
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
        stroke: toolboxState[boardState.activeToolItem]?.stroke,
        fill: toolboxState[boardState.activeToolItem]?.fill,
        size: toolboxState[boardState.activeToolItem]?.size,
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
