import React, { useReducer } from "react";
import { BOARD_ACTIONS, TOOL_ACTIONS_TYPES, TOOL_ITEMS } from "../../constants";
import boardContext from "./board-context";
import rough from "roughjs/bin/rough";
import { createElement, getSvgPathFromStroke } from "../utils/element";
import { isPointNearElement } from "../utils/element";
import getStroke from "perfect-freehand";
const gen = rough.generator();

//board reducer
const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL: {
      console.log("2");

      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    case BOARD_ACTIONS.CHANGE_ACTION_TYPE: {
      return {
        ...state,
        toolActionType: action.payload.actionType,
      };
    }
    case BOARD_ACTIONS.DRAW_DOWN: {
      //get the payload
      const { clientX, clientY, stroke, fill, size } = action.payload;
      //create the new element
      const newEle = createElement(
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
        //Declare the tool action type
        toolActionType:
          state.activeToolItem === TOOL_ITEMS.TEXT
            ? TOOL_ACTIONS_TYPES.WRITING
            : TOOL_ACTIONS_TYPES.DRAWING,
        //update the elements
        elements: [...prevElements, newEle],
      };
    }
    case BOARD_ACTIONS.DRAW_MOVE: {
      // console.log("onside dra move");

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
          const newElement = createElement(
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
          throw new Error("Type not defined");
      }
    }
    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state,
        toolActionType: TOOL_ACTIONS_TYPES.NONE,
      };
    }
    case BOARD_ACTIONS.ERASE: {
      console.log("onside dra erase");
      const { clientX, clientY } = action.payload;
      let newElements = [...state.elements];
      // console.log(newElements);

      newElements = newElements.filter((element) => {
        return !isPointNearElement(element, clientX, clientY);
      });
      //console.log("elements after erse: ", newElements);

      return {
        ...state,
        elements: newElements,
      };
    }
    case BOARD_ACTIONS.CHANGE_TEXT:{
      console.log("bp ke text ke andr");
      
      const index=state.elements.length-1;
      const newElements=[...state.elements];
      newElements[index].text=action.payload.text;
      return {
        ...state,
        //TEXTAREA GAYAB KRO
        toolActionType:TOOL_ACTIONS_TYPES.NONE,
        elements:newElements,
      }
    }
    default:
      return state;
  }
};

//initial state of the board
const initialBoardState = {
  activeToolItem: TOOL_ITEMS.BRUSH,
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
    if(boardState.toolActionType===TOOL_ACTIONS_TYPES.WRITING)return; 
    const { clientX, clientY } = event;
    //dispatch th action to change the state of the elements

    //JAB PHLI BAAR ERASER TOUCH KARA TO YE
    if (boardState.activeToolItem === TOOL_ITEMS.ERASER) {
      console.log("1");
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload: {
          actionType: TOOL_ACTIONS_TYPES.ERASING,
        },
      });
      return;
    }
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
    if(boardState.toolActionType===TOOL_ACTIONS_TYPES.WRITING)return;
    const { clientX, clientY } = event;
    //dispatch th action to change the state of the elements
    //console.log(boardState.toolActionType);

    if (boardState.toolActionType === TOOL_ACTIONS_TYPES.DRAWING) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_MOVE,
        payload: {
          clientX,
          clientY,
        },
      });
    } else if (boardState.toolActionType === TOOL_ACTIONS_TYPES.ERASING) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.ERASE,
        payload: {
          clientX,
          clientY,
        },
      });
    }
  };

  //just change the toolaction type to none
  const boardMouseUpHandler = () => {
    if(boardState.toolActionType===TOOL_ACTIONS_TYPES.WRITING)return; 
    //dispatch th action to change the state of the elements
    if (boardState.toolActionType === TOOL_ACTIONS_TYPES.DRAWING) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_UP,
      });
    }
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
      payload: {
        actionType: TOOL_ACTIONS_TYPES.NONE,
      },
    });
  };

  const textAreaBlurHandler=(text,toolboxState)=>{
    console.log("Blur handler:", { text, toolboxState });

     dispatchBoardAction({
      type:BOARD_ACTIONS.CHANGE_TEXT,
      payload:{
        text,
        stroke:toolboxState[boardState.activeToolItem]?.stroke,
        size:toolboxState[boardState.activeToolItem]?.size,
      }
     })
  }

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
    textAreaBlurHandler,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
