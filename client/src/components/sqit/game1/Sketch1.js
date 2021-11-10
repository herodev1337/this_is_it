import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import p5 from 'p5';

import Editor from 'components/sqit/Editor';
import get_sketch from './sketch_1';
import * as helpers from '../helpers.js';


const Sketch1 = () => {
  let myp5, editorCallback;
  const p5Ref = useRef();

  useEffect(() => {
    [myp5, editorCallback] = get_sketch(p5Ref.current);

    window.addEventListener('resize', () =>
      myp5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
    );

    return () =>
      window.removeEventListener('resize', () =>
        myp5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
      );
  }, []);

  return (
    <>
      <div className="canvasHolder" ref={p5Ref}></div>
      <Editor changeCallback={value => editorCallback(value)} />
    </>
  );
};

export default Sketch1;
