import { useEffect, useRef,useContext } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
function Board() {
  const canvasRef = useRef();
  const { elements,boardMouseDownHandler } = useContext(boardContext);
  useEffect(() => {
    const canvas = canvasRef.current;

    // Ensure the canvas is properly sized
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // console.log('Shapes drawn');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context=canvas.getContext("2d");
    context.save();
    // Create the rough canvas context
    const roughCanvas = rough.canvas(canvas);


    //draw all the element present in the board
    // elements.forEach(element => {
    //   roughCanvas.draw(element.roughEle);
    // });

    //clear the whole board 
    return()=>{
      context.clearRect(0,0,canvas.width,canvas.height);
    }
  }, [elements]);

  const handleBoardMouseDown = (event) => {
    const {clientX, clientY}=event;
    //calling the fcn responsible
    boardMouseDownHandler(event);
    console.log(clientX, clientY);
  };

  return <canvas ref={canvasRef} onClick={handleBoardMouseDown} />;
}

export default Board;
