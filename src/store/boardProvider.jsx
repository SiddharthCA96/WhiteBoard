import React, { act, useState } from "react";
import { TOOL_ITEMS } from "../../constants";

const boardProvider = ({ children }) => {

    const [activeToolItem,setActiveToolItem]=useState(TOOL_ITEMS.LINE);

    const handleToolItemClick=(tool)=>{
        setActiveToolItem(tool);
    }

    //OBJECT USED BY ALL CONSUMERS OF THIS CONTEXT
    const boardContextValue={
        activeToolItem,
        handleToolItemClick,
    };

  return (
    <boardContext.Provider
      value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default boardProvider;
