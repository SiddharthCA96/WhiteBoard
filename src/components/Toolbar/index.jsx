import React, { useState } from "react";
import classes from "./index.module.css";

import cx from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaSlash } from "react-icons/fa";
const ToolBar = () => {
  const [activeToolItem, setActiveToolItem] = useState("A");

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "A",
        })}
        onClick={()=>setActiveToolItem("A")}
        >
        <FaSlash/>
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "B",
        })}
        onClick={()=>setActiveToolItem("B")}
        >
        <LuRectangleHorizontal />
      </div>
    </div>
  );
};

export default ToolBar;
