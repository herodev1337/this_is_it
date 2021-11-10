import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import p5 from 'p5';

import Editor from 'components/sqit/Editor';
import get_sketch from './sketch_1';
import * as helpers from '../helpers.js';

const Sketch1 = () => {
  let editorGetter, editor2Setter;
  let myp5;
  const p5Ref = useRef();
  let some

  // const [loading, setLoading] = useState(false)
  const baseProps = {
    "p5": undefined,
    "getter": () => "",
    "setter1": () => "",
    "setter2": () => ""
  }
  const [editorProps, setProps] = useState(baseProps)

  useEffect(() => {
    // [myp5, editorGetter, editorSetter, editor2Setter] = get_sketch(
    //   p5Ref.current
    // );

    setProps(get_sketch(p5Ref.current))

    window.addEventListener('resize', () =>
      myp5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
    );

    return () =>
      window.removeEventListener('resize', () =>
        myp5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
      );
  }, []);
  // setLoading(true);

  return (
    <>
      <div className="canvasHolder" ref={p5Ref}></div>
      <Editor
        setter1={() => editorProps.setter1()}
        setter2={() => editorProps.setter2()}
        getter={value => editorProps.getter(value)}
      />
    </>
  );
};

export default Sketch1;
