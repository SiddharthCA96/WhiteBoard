import { useEffect, useRef, useContext, useLayoutEffect } from "react";
import { TOOL_ACTIONS_TYPES } from "../../../constants";
import rough from "roughjs";
import boardContext from "../../store/board-context";
function Board() {
  const canvasRef = useRef();
  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    toolActionType,
  } = useContext(boardContext);
  useEffect(() => {
    const canvas = canvasRef.current;

    // Ensure the canvas is properly sized
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // console.log('Shapes drawn');
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });
  }, [elements]);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    //calling the fcn responsible
    boardMouseDownHandler(event);
    console.log(clientX, clientY);
  };
  const handleMouseMove = (event) => {
    //JAB IK BAAR START HO CHUKA HAI TAB HI KARO YE
    if (toolActionType == TOOL_ACTIONS_TYPES.DRAWING) {
      console.log("move ke andar");

      boardMouseMoveHandler(event);
    }
  };

  const handleMouseUp=()=>{
    boardMouseUpHandler();
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

export default Board;
