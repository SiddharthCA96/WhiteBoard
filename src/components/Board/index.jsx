import { useEffect, useRef } from "react";
import rough from "roughjs";

function Board() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    // Ensure the canvas is properly sized
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create the rough canvas context
    const roughCanvas = rough.canvas(canvas);

    // Access the generator from roughCanvas
    const generator = roughCanvas.generator;

    // Generate two rectangles
    const rect1 = generator.rectangle(10, 10, 100, 100, { fill: "red" });
    const rect2 = generator.rectangle(10, 120, 100, 100, { fill: "blue" });

    // Draw the rectangles on the roughCanvas
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);

   // console.log('Shapes drawn');
  }, []);

  const handleBoardMouseDown=(event)=>{
    //get the x and y coordinate of the click of the mouse
    const clientX=event.clientX;
    const clientY=event.clientY;

    console.log(clientX,clientY);
    
  }

  return <canvas ref={canvasRef} onClick={handleBoardMouseDown}/>
}

export default Board;
