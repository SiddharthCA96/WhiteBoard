import React, { useContext } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaSlash, FaRegCircle, FaArrowRight,FaPaintBrush } from "react-icons/fa";
import boardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../../constants";

const ToolBar = () => {
  const { activeToolItem, handleToolItemClick } = useContext(boardContext);

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.BRUSH,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.BRUSH)}>
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.LINE,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.LINE)}>
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLE,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.RECTANGLE)}>
        <LuRectangleHorizontal />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.CIRCLE,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.CIRCLE)}>
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ARROW,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.ARROW)}>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default ToolBar;
