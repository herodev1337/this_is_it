import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';

import get_sketch from './sketch';
import * as helpers from '../helpers.js';

import Editor from 'components/sqit/Editor';

const Sketch1 = () => {
  const p5Ref = useRef();
  let myp5, editorCallback;

  // const [width, height] = getEditorSizes();
  // console.log(width, height);

  useEffect(() => {
    // [myp5, editorCallback] = get_sketch(p5Ref.current);
    // p5.width = width;
    // p5.height = height;
    // p5.resizeCanvas(width, height);
    myp5 = get_sketch(p5Ref.current);

    window.addEventListener(
      'resize',
      () =>
        myp5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
        // p5.resizeCanvas(width, height)
        // (p5.width = 6)
    );

    // window.dispatchEvent(new Event('resize'));

    return () =>
      window.removeEventListener('resize', () =>
        myp5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
      );
  }, []);

  return (
    <>
      <div
        ref={p5Ref}
      ></div>
      <Editor/>
    </>
  );
};

export default Sketch1;


