import React, { useContext} from "react";
import classes from "./index.module.css";
import cx from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaSlash } from "react-icons/fa";
import boardContext from "../../store/board-context";


const ToolBar = () => {
  const {activeToolItem,handleToolItemClick}=useContext(boardContext);

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "A",
        })}
        onClick={()=>handleToolItemClick("A")}
        >
        <FaSlash/>
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "B",
        })}
        onClick={()=>handleToolItemClick("B")}
        >
        <LuRectangleHorizontal />
      </div>
    </div>
  );
};

export default ToolBar;
