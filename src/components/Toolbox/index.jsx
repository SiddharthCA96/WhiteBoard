import React, { useContext } from "react";
import classes from "./index.module.css";
import { COLORS, STROKE_TOOL_TYPES,FILL_TOOL_TYPES } from "../../../constants";
import cx from "classnames";
import toolboxContext from "../../store/ToolBoxContext";
import boardContext from "../../store/board-context";

const ToolBox = () => {
  // Get the current active toolitem
  const { activeToolItem } = useContext(boardContext);

  // Get the active toolbox state
  const { toolboxState, changeStroke, changeFill } = useContext(toolboxContext);

  const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;

  return (
    <div className={classes.container}>
      {/* Show the Stroke Color option only for stroke tools */}
      {STROKE_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Stroke Color</div>
          <div className={classes.colorsContainer}>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: strokeColor === COLORS[k], // Apply active class if colors match
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => changeStroke(activeToolItem, COLORS[k])}
                />
              );
            })}
          </div>
        </div>
      )}

      {FILL_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classes.colorsContainer}>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: fillColor === COLORS[k], // Apply active class if colors match
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => changeFill(activeToolItem, COLORS[k])}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
