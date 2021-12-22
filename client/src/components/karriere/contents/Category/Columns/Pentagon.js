import { fill } from 'lodash';
import React, { useState, useEffect, useRef, createRef } from 'react';

import styles from "styles/scss/karriere.module.scss"

const pol2cart = (r, theta) => {
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
};

function Pentagon({ side, labels, mouseEnter, mouseLeave, selected }) {
  const width = (side * (1 + Math.sqrt(5))) / 2;
  const height = (side * Math.sqrt(5 + 2 * Math.sqrt(5))) / 2;

  const pentagon = useRef(null);
  const path = useRef(null);
  const catRef = useRef(labels.map(() => createRef()));
  const pentRef = useRef(labels.map(() => createRef()));

  const [textOff, setTextOff] = useState(
    Array(labels.length).fill({ x: 0, y: 0 })
  );
  const [pathDim, setPathDim] = useState({ x: undefined, y: undefined });
  const [size, setSize] = useState({
    x: undefined,
    y: undefined,
  });
  const [pos, setPos] = useState({
    left: undefined,
    top: undefined,
  });
  const [transform, setTransform] = useState('');

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
    setTextOff(
      catRef.current.map(ref => {
        return {
          x: ref.current.clientWidth / 2,
          y: ref.current.clientHeight / 2,
        };
      })
    );
  }, []);

  useEffect(() => {
    if (isNaN(pathDim.x)) {
      return;
    }
    const transX = width / pathDim.x;
    const transY = height / pathDim.y;
    setTransform(
      `translate(${transX * -22.912812},${transY * -62.130247})` +
        `scale(${transX}, ${transY})`
    );
  }, [pathDim]);

  const pentaMouse = (e) => {
    mouseEnter(e.target.id.split('_')[1]);
  };

  useEffect(() => {
    if (selected === null) {
      for (let j = 0; j < 5; j++) {
        pentRef.current[j].current.style.fill = '#00b4c5';
      }
    } else {
      if (selected < 0) {
        return;
      }
      for (let j = 0; j < 5; j++) {
        pentRef.current[j].current.style.fill = '#00b4c5';
      }
      pentRef.current[selected].current.style.fill = '#05e0f5';
    }
  }, [selected]);

  return (
    <div ref={pentagon}>
      <svg
        id={styles.pentagon}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g
          ref={path}
          id={styles.pentagonParts}
          style={{ display: 'inline' }}
          transform={transform}
        >
          <path
            id="penta_0"
            ref={pentRef.current[0]}
            d="M 309.98633,2.7226562 156.36523,114.33594 310.25195,326.14648 464.14062,114.33594 310.57227,2.734375 a 323.74763,323.74763 0 0 0 -0.58594,-0.011719 z"
            transform="matrix(0.26458333,0,0,0.26458333,22.912812,62.130247)"
            style={penta_style}
            onMouseEnter={e => {
              pentaMouse(e);
            }}
            onMouseLeave={e => {
              mouseLeave(0);
            }}
          />
          <path
            id="penta_1"
            ref={pentRef.current[1]}
            d="m 186.36036,121.91373 -40.64583,-29.530655 -40.71677,56.040865 65.88072,21.40578 15.52693,-47.76756 a 85.658226,85.658226 0 0 0 -0.045,-0.14837 z"
            style={penta_style}
            onMouseEnter={e => {
              pentaMouse(e);
            }}
            onMouseLeave={e => {
              mouseLeave();
            }}
          />
          <path
            id="penta_2"
            ref={pentRef.current[2]}
            d="m 155.35136,217.61008 15.52507,-47.78196 -65.8802,-21.40637 1.5e-4,69.27104 50.22774,0.006 a 85.658226,85.658226 0 0 0 0.12721,-0.0886 z"
            style={penta_style}
            onMouseEnter={e => {
              pentaMouse(e);
            }}
            onMouseLeave={e => {
              mouseLeave();
            }}
          />
          <path
            id="penta_3"
            ref={pentRef.current[3]}
            d="m 54.756412,217.69057 50.240858,-2.2e-4 5.7e-4,-69.27073 -65.880628,21.40607 15.515604,47.77125 a 85.658226,85.658226 0 0 0 0.123597,0.0936 z"
            style={penta_style}
            onMouseEnter={e => {
              pentaMouse(e);
            }}
            onMouseLeave={e => {
              mouseLeave();
            }}
          />
          <path
            id="penta_4"
            ref={pentRef.current[4]}
            d="M 23.594314,122.04396 39.119802,169.82579 105.00036,148.4205 64.283747,92.379134 23.645169,121.89748 a 85.658226,85.658226 0 0 0 -0.05085,0.14648 z"
            style={penta_style}
            onMouseEnter={e => {
              pentaMouse(e);
            }}
            onMouseLeave={e => {
              mouseLeave();
            }}
          />
        </g>
        <g id="grid" style={{ display: 'inline' }} transform={transform}>
          <g id="grid">
            <g id="g4645" style={{ display: 'inline' }}>
              <path
                d="m 186.08405,122.1519 -81.08601,26.34644 50.11433,68.97628 a 85.25897,85.25897 0 0 0 0.29244,-0.22542 l 30.77906,-94.72819 a 85.25897,85.25897 0 0 0 -0.0998,-0.36912 z m -30.97108,95.32015 -50.11391,-68.97588 -50.114162,68.9764 a 85.25897,85.25897 0 0 0 0.304756,0.20847 l 99.603116,1e-5 a 85.25897,85.25897 0 0 0 0.32021,-0.20899 z m -100.225445,3e-4 50.113915,-68.97588 -81.086587,-26.34652 a 85.25897,85.25897 0 0 0 -0.104088,0.35426 l 30.779044,94.7282 a 85.25897,85.25897 0 0 0 0.297714,0.23995 z m -30.97165,-95.31997 81.086015,26.34644 -1e-4,-85.259446 a 85.25897,85.25897 0 0 0 -0.36909,0.01048 L 24.052071,121.79509 a 85.25897,85.25897 0 0 0 -0.136203,0.35729 z M 104.99979,63.241099 v 85.258881 l 81.08652,-26.34671 a 85.25897,85.25897 0 0 0 -0.12402,-0.34779 L 105.38168,63.260221 a 85.25897,85.25897 0 0 0 -0.38189,-0.01913 z M 105,71.634605 178.11123,124.75302 150.18522,210.70043 H 59.814774 L 31.888772,124.75302 Z m 0,8.387345 64.98776,47.21637 -24.82312,76.3977 H 64.835353 l -24.823114,-76.3977 z m 0,8.65192 56.86429,41.31433 -21.72023,66.84798 H 69.855935 L 48.13571,129.98819 Z m 0,8.519627 48.74082,35.412283 -18.61734,57.29827 -60.246964,-1e-5 -18.617335,-57.29827 z m 0,8.519593 40.61735,29.51023 -15.51445,47.74856 H 79.897095 L 64.382649,135.22332 Z m 0,8.65192 32.49388,23.60819 -12.41156,38.19884 H 84.917677 L 72.50612,137.97319 Z m 0,8.51964 24.37041,17.70614 -9.30867,28.64914 -30.123482,-10e-6 -9.308667,-28.64913 z m 0,8.50356 16.24694,11.80409 -6.20578,19.09943 H 94.958838 L 88.75306,143.1923 Z m 0,8.53569 8.12347,5.90205 -3.10289,9.54971 H 99.979419 l -3.102889,-9.54971 z"
                pointerEvents="none"
                style={{
                  display: 'inline',
                  opacity: '1',
                  fill: 'none',
                  fillOpacity: '1',
                  stroke: '#000000',
                  strokeWidth: '0.46499997',
                  strokeMiterlimit: '4',
                  strokeDasharray: 'none',
                  strokeOpacity: '1',
                }}
                id={styles.gridBorder}
              />
            </g>
            <path
              d="m 105,62.982727 81.2347,59.020473 -31.02889,95.49712 -100.41162,-10e-6 -31.028893,-95.49712 z"
              id={styles.gridNet}
              pointerEvents="none"
              style={{
                display: 'inline',
                opacity: '1',
                fill: 'none',
                fillOpacity: '1',
                stroke: '#000000',
                strokeWidth: '1.70500004',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
              }}
            />
          </g>
        </g>
      </svg>

      <div
        style={{
          position: 'absolute',
          left: `${pos.left + size.x / 2}px`,
          top: `${pos.top + size.y / 2}px`,
        }}
      >
        {labels.map((label, i) => {
          const catPos = pol2cart(side, (-i * 72 * Math.PI) / 180);
          return (
            <span
              className={styles.catName}
              style={{
                position: 'absolute',
                alignSelf: 'center',
                left: -textOff[i].x - catPos.y * 1.2,
                top: textOff[i].y - catPos.x * 0.95 - 15,
              }}
              key={i}
              ref={catRef.current[i]}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const penta_style = {
  opacity: '1',
  fill: '#00b4c5',
  fillOpacity: '1',
  stroke: '#00b4c5',
  strokeWidth: '0.50099999',
  strokeLinejoin: 'round',
  strokeMiterlimit: '4',
  strokeDasharray: 'none',
  strokeOpacity: '1',
};

export default Pentagon;
