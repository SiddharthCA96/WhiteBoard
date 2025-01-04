import { useEffect, useRef, useContext, useLayoutEffect } from "react";
import { TOOL_ACTIONS_TYPES, TOOL_ITEMS } from "../../../constants";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/ToolBoxContext";
function Board() {
  const canvasRef = useRef();
  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  } = useContext(boardContext);

  //get the toolboxstate to use it
  const { toolboxState } = useContext(toolboxContext);
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
    context.save();
    const roughCanvas = rough.canvas(canvas);

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

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
        default:
          throw new Error("Type not recognised");
      }
    });
  }, [elements]);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    //calling the fcn responsible
    boardMouseDownHandler(event, toolboxState);
    console.log(clientX, clientY);
  };
  const handleMouseMove = (event) => {
    //JAB IK BAAR START HO CHUKA HAI TAB HI KARO YE
    boardMouseMoveHandler(event);
    // if (toolActionType == TOOL_ACTIONS_TYPES.DRAWING) {
    //   console.log("move ke andar");

    //   boardMouseMoveHandler(event);
    // }
  };

  const handleMouseUp = () => {
    boardMouseUpHandler();
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

export default Board;
