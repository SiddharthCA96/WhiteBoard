import React, {  useReducer } from "react";
import { TOOL_ITEMS } from "../../constants";
import boardContext from "./board-context";

//board reducer
const boardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TOOL":
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
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
    handleToolItemClick,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
