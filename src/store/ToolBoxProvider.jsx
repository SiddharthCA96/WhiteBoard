import React, { useReducer } from "react";
import toolboxContext from "./ToolBoxContext";
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from "../../constants";

const toolboxReducer = (state, action) => {
  switch (action.type) {
    case TOOLBOX_ACTIONS.CHANGE_STROKE: {
      const newState = { ...state };
      newState[action.payload.tool].stroke = action.payload.stroke;
      return newState;
    }
    case TOOLBOX_ACTIONS.CHANGE_FILL: {
      const newState = { ...state };
      newState[action.payload.tool].fill = action.payload.fill;
      return newState;
    }
    case TOOLBOX_ACTIONS.CHANGE_SIZE: {
      const newState = { ...state };
      newState[action.payload.tool].size = action.payload.size;
      return newState;
    }
    default:
      state;
  }
};

//initial tool box state  (har ik tool ka ik object taaki yaad rhe ki uske liye last settings kya thi)
const initialToolboxState = {
  [TOOL_ITEMS.BRUSH]: {
    stroke:COLORS.BLACK,
  },
  [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.TEXT]: {
    stroke: COLORS.BLACK,
    size: 16,
  },
};
const ToolBoxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState
  );

  //function to handle the on click of the color stroke change
  const changeStrokeHandler = (tool, stroke) => {
    //dispathc the action to change stroke color
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_STROKE,
      payload: {
        tool,
        stroke,
      },
    });
  };
  //function to handle the change in fill color
  const changeFillHandler = (tool, fill) => {
    //dispatch the action to change fill color
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_FILL,
      payload: {
        tool,
        fill,
      },
    });
  };
  //function to change the size of brush
  const changeSizeHandler = (tool, size) => {
    //dispatch the actionn to change the brush size
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_SIZE,
      payload: {
        tool,
        size,
      },
    });
  };
  const toolboxContextValue = {
    toolboxState,
    changeStroke: changeStrokeHandler,
    changeFill: changeFillHandler,
    changeSize: changeSizeHandler,
  };

  return (
    <toolboxContext.Provider value={toolboxContextValue}>
      {children}
    </toolboxContext.Provider>
  );
};

export default ToolBoxProvider;
