import React, { useContext } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaFont,
  FaUndoAlt,
  FaRedoAlt,
} from "react-icons/fa";
import boardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../../constants";

const ToolBar = () => {
  const { activeToolItem, handleToolItemClick,boardRedoHandler,boardUndoHandler} =
    useContext(boardContext);

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
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ERASER,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.ERASER)}>
        <FaEraser />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.TEXT,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.TEXT)}>
        <FaFont />
      </div>
      <div
        className={cx(classes.toolItem)}
        onClick={() => boardUndoHandler()}>
        <FaUndoAlt />
      </div>
      <div
        className={cx(classes.toolItem)}
        onClick={() => boardRedoHandler()}>
        <FaRedoAlt />
      </div>
    </div>
  );
};

export default ToolBar;
