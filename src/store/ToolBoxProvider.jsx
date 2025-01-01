import React, { useReducer } from 'react'
import toolboxContext from './ToolBoxContext'
import { COLORS, TOOL_ITEMS } from '../../constants';



const toolboxReducer=(state,action)=>{
    switch (action.type) {
        case value:
            break;
        default:
            break;
    }
}


//initial tool box state  (har ik tool ka ik object taaki yaad rhe ki uske liye last settings kya thi)
const initialToolboxState={
    [TOOL_ITEMS.LINE]:{
        stroke:COLORS.BLACK,
        size:1,
    },
    [TOOL_ITEMS.RECTANGLE]:{
        stoke:COLORS.BLACK,
        fill:null,
        size:1,
    },
    [TOOL_ITEMS.CIRCLE]:{
        stoke:COLORS.BLACK,
        fill:null,
        size:1,
    },
    [TOOL_ITEMS.ARROW]:{
        stoke:COLORS.BLACK,
        size:1,
    },

}
const ToolBoxProvider = ({children}) => {
    const [toolboxState,dispatchToolboxAction]=useReducer(
        toolboxReducer,
        initialToolboxState,
    );
    const toolboxContextValue={
        toolboxState,
    }
  return (
    <toolboxContext.Provider value={toolboxContextValue}>
        {children}
    </toolboxContext.Provider>
  )
}

export default ToolBoxProvider
