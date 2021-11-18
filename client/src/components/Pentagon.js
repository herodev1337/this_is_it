import React, { useState, useEffect, useRef, createRef } from 'react';

const pol2cart = (r, theta) => {
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
};

function Pentagon({ side, content }) {
  const width = (side * (1 + Math.sqrt(5))) / 2;
  const height = (side * Math.sqrt(5 + 2 * Math.sqrt(5))) / 2;
  const pentagon = useRef(null);
  const path = useRef(null);
  const catRef = useRef(content.map(() => createRef()));
  const [textOff, setTextOff] = useState(Array(content.length).fill({x: 0, y: 0}));
  const [pathDim, setPathDim] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    x: undefined,
    y: undefined,
  });
  const [pos, setPos] = useState({
    left: undefined,
    top: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        x: pentagon.current.clientWidth,
        y: pentagon.current.clientHeight,
      });
      setPos({
        left: pentagon.current.getBoundingClientRect().x,
        top: pentagon.current.getBoundingClientRect().y,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPathDim({
      x: path.current.getBBox().width,
      y: path.current.getBBox().height,
    });
  }, []);

  useEffect(() => {
    setTextOff(
      catRef.current.map((ref) => {
        return {x: ref.current.clientWidth / 2, y: ref.current.clientHeight / 2};
      })
    );
  }, []);

  return (
    <div style={{ border: '1px red solid', marginTop:"100px" }} ref={pentagon}>
      <svg height={height} width={width}>
        <g transform={`scale(${width / pathDim.x}, ${height / pathDim.y})`}>
          <path
            ref={path}
            d="M507.804,200.28L262.471,12.866c-3.84-2.923-9.131-2.923-12.949,0L4.188,200.28c-3.605,2.773-5.077,7.531-3.648,11.84
      l93.717,281.92c1.451,4.373,5.525,7.296,10.133,7.296h303.253c4.587,0,8.683-2.944,10.133-7.296l93.717-281.92
      C512.882,207.789,511.41,203.053,507.804,200.28z"
          />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          left: pos.left + size.x / 2,
          top: pos.top + size.y / 2,
        }}
      >
        {content.map((cat, i) => {
          const catPos = pol2cart(side, (i*72)*Math.PI/180)
          return (<span
            style={{
              position: 'absolute',
              alignSelf: 'center',
              left: -textOff[i].x-catPos.y,
              top: textOff[i].y-catPos.x
            }}
            key={i}
            ref={catRef.current[i]}
          >
            {cat.title}
          </span>)
        })}
      </div>
    </div>
  );
}

export default Pentagon;
