import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import p5 from 'p5';

import Editor from 'components/sqit/Editor';
import get_sketch from './sketch_1';
import * as helpers from '../helpers.js';

const Sketch1 = () => {
  const p5Ref = useRef();
  const baseProps = {
    "p5": undefined,
    "getter": () => ""
  }
  const [editorProps, setProps] = useState(baseProps)
  const [textState1, setText1] = useState(`// Open the gate to enter the next challenge\n\nlet gate ="close";\ngate`)
  const [textState2, setText2] = useState(`Output:\nclose`)

  useEffect(() => {
    const newProps = get_sketch(p5Ref.current, setText1, setText2)
    setProps(newProps)

    window.addEventListener('resize', () =>
      newProps.p5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
    );

    return () =>
      window.removeEventListener('resize', () =>
      newProps.p5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
      );
  }, []);

  return (
    <>
      <div className="canvasHolder" ref={p5Ref}></div>
      <Editor
        setter1={textState1}
        setter2={textState2}
        getter={value => editorProps.getter(value)}
      />
    </>
  );
};

export default Sketch1;
