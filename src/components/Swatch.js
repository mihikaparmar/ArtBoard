import React, { useState } from "react";
import { styles } from "../theme/styles";
import {
  
  
  Rectangle,
  Circle,
  Brush,
  Pencil,
  
  Eraser,
  Reset,
  
} from "../theme/svg";
import ColourPicker from "./ColourPicker";


export default function Swatch({
  toolType,
  setToolType,
  width,
  setWidth,
  setElements,
  setColorWidth,
  setPath,
  colorWidth,
  setShapeWidth,
}) {
  const [displayStroke, setDisplayStroke] = useState(false);

  const handleClickStroke = () => {
    setDisplayStroke(!displayStroke);
    setColorWidth(colorWidth);
  };

  
  return (
    <div>
      <div className="row">
        <div
          className="col-md-1 icon-bar"
          
        >
          <div>
              <button
                
                onClick={handleClickStroke}
              ></button>
            </div>
          <div
            className="row"
            style={{ position: "absolute", right: "-280px", top: "0px" }}
          >
            {displayStroke && (
              <div className="col-md-3">
                <ColourPicker setColorWidth={setColorWidth} />
              </div>
            )}
          </div>
        

          <button
            id="rectangle"
            data-toggle="tooltip"
            data-placement="top"
            title="Rectangle"
           
            onClick={() => {
              setToolType("rectangle");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Rectangle toolType={toolType} colorWidth={colorWidth} />
          </button>

          <button
            id="circle"
            data-toggle="tooltip"
            data-placement="top"
            title="Circle"
          
            onClick={() => {
              setToolType("circle");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Circle toolType={toolType} colorWidth={colorWidth} />
          </button>

          

          <button
            id="pencil"
            data-toggle="tooltip"
            data-placement="top"
            title="Pencil"
            
            onClick={() => {
              setToolType("pencil");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Pencil toolType={toolType} colorWidth={colorWidth} />
          </button>

          <button
            id="brush"
            data-toggle="tooltip"
            data-placement="top"
            title="Brush"
            
            onClick={() => {
              setToolType("brush");
              setWidth(10);
              setShapeWidth(1);
            }}
          >
            <Brush toolType={toolType} colorWidth={colorWidth} />
          </button>

          <button
            id="eraser"
            data-toggle="tooltip"
            data-placement="top"
            title="Eraser"
           
            onClick={() => {
              setToolType("eraser");
              setWidth(10);
              setShapeWidth(1);
            }}
          >
            <Eraser toolType={toolType} colorWidth={colorWidth} />
          </button>
          <button
              
              data-toggle="tooltip"
              data-placement="top"
              title="Clear"
              onClick={() => {
                setElements([]);
                setPath([]);
                return;
              }}
            >
              <Reset />
            </button>
            
        </div>

        
            
            
           
            
          </div>
          
        </div>
      
  );
}
