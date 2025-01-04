import { ARROW_LENGTH, TOOL_ITEMS } from "../../constants";
import rough from "roughjs/bin/rough";
import { getArrowHeadsCoordinates } from "./math";
import { getStroke } from 'perfect-freehand';
const gen = rough.generator();

//function to generate new element of different type
export const createRoughElement = (id, x1, y1, x2, y2, { type,stroke,fill,size}) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    fill,
    stroke,
    size,
  };
  //set some setting for the creation of elements 

  let options={
    seed:id+1,//har baar nhi generate hoga newelement
    //id cant  be zero 
    fillStyle:"solid",
  }
  if(stroke){
    options.stroke=stroke;
  }
  if(fill){
    options.fill=fill;
  }
  if(size){
    options.strokeWidth=size;
  }
  switch (type) {
    case TOOL_ITEMS.BRUSH:{
      const brushElement={
        id,
        points:[{x:x1,y:y1}],
        path:new Path2D(getSvgPathFromStroke(getStroke([{x:x1,y:y1}]))),
        type,
        stroke,
      }
      return brushElement;
    }
    case TOOL_ITEMS.LINE:{
        element.roughEle=gen.line(x1,y1,x2,y2,options);
        return element;
    }
    case TOOL_ITEMS.RECTANGLE:{
        element.roughEle=gen.rectangle(x1,y1,x2-x1,y2-y1,options);
        return element;
    }  
    case TOOL_ITEMS.CIRCLE:{
        const cx=(x1+x2)/2;
        const cy=(y1+y2)/2;
        const width=x2-x1;
        const height=y2-y1;
        element.roughEle=gen.ellipse(cx,cy,width,height,options);
        return element;
    }
    case TOOL_ITEMS.ARROW:{
        const {x3,y3,x4,y4}=getArrowHeadsCoordinates(x1,y1,x2,y2,ARROW_LENGTH);
        const points=[
            [x1,y1],
            [x2,y2],
            [x3,y3],
            [x2,y2],
            [x4,y4],
        ]
        element.roughEle=gen.linearPath(points,options);
        return element;
    }
    default:
        throw new Error("Type not recognised");
  }
};

export const isPointNearElement=(element,pointX,pointY)=>{
  
}
export const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};