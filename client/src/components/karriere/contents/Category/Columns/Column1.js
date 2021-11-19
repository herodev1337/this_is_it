import React, { useState, useEffect, useRef } from 'react';

const Column1 = ({ OnlyCat }) => {
  const ref = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [pentaCenter, setPentaCenter] = useState({left: 0, top: 0})
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });

    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="svg-container" ref={ref}>
      <div className="penta">
        <svg x="0px" y="0px" viewBox="0 0 512.01 512.01">
          <g>
            <path
              d="M507.804,200.28L262.471,12.866c-3.84-2.923-9.131-2.923-12.949,0L4.188,200.28c-3.605,2.773-5.077,7.531-3.648,11.84
			l93.717,281.92c1.451,4.373,5.525,7.296,10.133,7.296h303.253c4.587,0,8.683-2.944,10.133-7.296l93.717-281.92
			C512.882,207.789,511.41,203.053,507.804,200.28z"
            />
          </g>
        </svg>
        <div className="cat-box" style={{left: pentaCenter.left, top: pentaCenter.top}}>
          <span>.</span>
        {OnlyCat.map(el => (
          <div key={el.title} id={el.title}className="cats">
            {el.title}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Column1;
