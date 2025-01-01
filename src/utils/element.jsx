import { TOOL_ITEMS } from "../../constants";
import rough from "roughjs/bin/rough";

const gen = rough.generator();

//function to generate new element of different type
export const createRoughElement = (id, x1, y1, x2, y2, { type }) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
  };
  //set some setting for the creation of elements 

  let options={
    seed:id+1,//har baar nhi generate hoga newelement
    //id cant  be zero 
  }
  switch (type) {
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
    default:
        throw new Error("Type not recognised");
  }
};
