import React, { useContext } from "react";
import classes from "./index.module.css";
import { COLORS } from "../../../constants";
import cx from "classnames";
import toolboxContext from "../../store/ToolBoxContext";
import boardContext from "../../store/board-context";

const ToolBox = () => {
  //get the current active toolitem
  const { activeToolItem } = useContext(boardContext);
  console.log(activeToolItem);
  
  //get the active toolboxstate
  const { toolboxState } = useContext(toolboxContext);
  console.log(toolboxState);
  
  const strokeColor = toolboxState[activeToolItem]?.stroke;
  console.log(strokeColor);
  
  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((k) => {
            return (
              <div
                key={k} // Always add a unique key when mapping over elements
                className={
                  (cx(classes.colorBox,
                  { [classes.activeColorBox]: strokeColor === COLORS[k] }))
                }
                style={{ backgroundColor: COLORS[k] }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
