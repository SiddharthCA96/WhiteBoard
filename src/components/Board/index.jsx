import { useEffect, useRef, useContext, useLayoutEffect } from "react";
import { TOOL_ACTIONS_TYPES, TOOL_ITEMS } from "../../../constants";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/ToolBoxContext";
import classes from "./index.module.css";
function Board() {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const {
    elements,
    toolActionType,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    boardUndoHandler,
    boardRedoHandler,
  } = useContext(boardContext);

  //get the toolboxstate to use it
  const { toolboxState } = useContext(toolboxContext);
  useEffect(() => {
    const canvas = canvasRef.current;

    // Ensure the canvas is properly sized
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
    const roughCanvas = rough.canvas(canvas);

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    console.log("Updated elements:", elements);
    // Draw elements
    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSH: {
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        }
        case TOOL_ITEMS.TEXT: {
          context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          context.restore();
          break;
        }
        default:
          throw new Error("Type not recognised");
      }
    });
  }, [elements]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (toolActionType === TOOL_ACTIONS_TYPES.WRITING) {
      setTimeout(() => {
        textArea.focus();
      }, 0);
      //textArea.focus();
    }
  }, [toolActionType]);

  //for keyboard shortcut for undo and redo handler
  useEffect(()=>{
    function handleKeyDown(event){
      if(event.ctrlKey&&event.key==="z"){
        boardUndoHandler();
      }
      else if(event.ctrlKey&&event.key==="y"){
        boardRedoHandler();
      }
    }
    document.addEventListener("keydown",handleKeyDown);

    //unmount the event listner
    return()=>{
      document.removeEventListener("keydown",handleKeyDown);
    }
  },[boardRedoHandler,boardUndoHandler])
  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    //calling the fcn responsible
    boardMouseDownHandler(event, toolboxState);
    console.log(clientX, clientY);
  };
  const handleMouseMove = (event) => {
    //JAB IK BAAR START HO CHUKA HAI TAB HI KARO YE
    boardMouseMoveHandler(event);

  };

  const handleMouseUp = () => {
    boardMouseUpHandler();
  };

  return (
    <>
      {toolActionType === TOOL_ACTIONS_TYPES.WRITING && (
        <textarea
          className={classes.textElementBox}
          type="text"
          ref={textAreaRef}
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          onBlur={(event) =>
            textAreaBlurHandler(event.target.value, toolboxState)
          }
        />
      )}
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

export default Board;
