import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const canvasStyle = {
  outline: '2px solid blue',
}

const containerStyle = {
}

function ScribbleCanvas({ width=400, height=400, updateDataURL}) {
  const canvasRef = useRef(); 
  const ctxRef = useRef();
  const posRef = useRef([]);

  useEffect(() => {
    console.log("Hello world");
    ctxRef.current = canvasRef.current.getContext('2d');
  }, []);

  function getPos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x, y];
  }

  const draw = (oldPos, newPos) => {
    const ctx = ctxRef.current;

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.moveTo(...oldPos);
    ctx.lineTo(...newPos);
    ctx.stroke();
  }

  const handleDrawStart = (e) => {
    console.log("Draw start");
    if (e.buttons !== 1) {
      return;
    }
    posRef.current = getPos(e);
    draw(posRef.current, posRef.current);
  }

  const handleDrawMove = (e) => {
    console.log("Drawing moving");
    if (e.buttons !== 1) {
      return;
    }
    const newPos = getPos(e); 
    draw(posRef.current, newPos);
    posRef.current = newPos;
  }

  const handleDrawEnd = (e) => {
    console.log("Drawing end");
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    updateDataURL(dataURL);
  }

  return (
    <React.Fragment>
      <div id="canvasContainer" style={containerStyle}>
        <canvas 
          ref={canvasRef}
          style={canvasStyle}
          width={width}
          height={height}
          onMouseDown={handleDrawStart}
          onMouseMove={handleDrawMove}
          onMouseUp={handleDrawEnd}>Canvas</canvas>
      </div>
    </React.Fragment>
  );
}

ScribbleCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  updateDataURL: PropTypes.func
}

export default ScribbleCanvas;