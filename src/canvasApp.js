import React, { useCallback, useEffect, useRef, useState } from 'react';

import jsPDF from 'jspdf';
const colors = [
  "red",
  "green",
  "yellow",
  "black",
  "blue"
]
function CanvaApp() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [valWidth, setvalWidth] = useState(200)
  const [valHeight, setvalHeight] = useState(200)
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);
  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      ctx.current.lineWidth = 10;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();
      setPosition({
        x,
        y
      })
    }
  }, [lastPosition, mouseDown, selectedColor, setPosition])
  const genPdfOrImage = async () => {
    var inputSelect = document.getElementById('Converter').value
    if (inputSelect === 'Image') {
      const image = canvasRef.current.toDataURL('image/png');
      const blob = await (await fetch(image)).blob();
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = "image.png";
      link.click();
    }
    else {
      const image = await canvasRef.current.toDataURL('image/png');
      var doc = new jsPDF()
      doc.addImage(image, 'PDF', 7, 13)
      doc.save()
    }
  }
  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }
  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    setMouseDown(true)
  }
  const onMouseUp = (e) => {
    setMouseDown(false)
  }
  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }
  const LogoOut = () => {
    localStorage.removeItem('User')
    window.location.href = '/'
  }
  const changeWidth = (e) => {
    setvalWidth(e.target.value)
  }
  const changeHeight = (e) => {
    setvalHeight(e.target.value)
  }
  return (<>
    
    <input type='number' value={valWidth} onChange={changeWidth} placeholder='...width' />
    <input type='number' value={valHeight} onChange={changeHeight} placeholder='...Height' />
    <div className="Canva-App">
      <canvas
        style={{
          border: "1px solid #000"
        }}
        width={valWidth}
        height={valHeight}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      />
      <br />
      <div>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {
            colors.map(
              color => <option key={color} value={color}>{color}</option>
            )
          }
        </select>
        <button onClick={clear}>Clear</button>
        <select name="/" id="Converter">
          <option value="Image">Image</option>
          <option value="Pdf">Pdf</option>
        </select>
        <button onClick={genPdfOrImage}>Download</button>
      </div>
    </div>
  </>
  );
}
export default CanvaApp;