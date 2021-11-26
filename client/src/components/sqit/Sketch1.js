import React, { useState, useRef, useEffect, lazy } from 'react';
import { useParams } from 'react-router-dom';
import p5 from 'p5';
// import 'regenerator-runtime/runtime'; // needs to be imported if async/await is beeing used

import Editor from 'components/sqit/Editor';
import * as helpers from './helpers.js';

const import_sketch = page => {
  const re = /game[1-6]/g;
  if (!page.match(re)) return

  const mod = require(`./${page}/config`)
  return {
    get_sketch: mod.default,
    text1: mod.ed1_txt,
    text2: mod.ed2_txt
  }
};

const Sketch1 = () => {
  const {get_sketch, text1, text2} = import_sketch(useParams().game);
  const p5Ref = useRef();
  const [textState1, setText1] = useState(text1);
  const [textState2, setText2] = useState(text2);

  const [editorProps, setProps] = useState({
    p5: undefined,
    getter: () => '',
  });

  
  useEffect(() => {
    const newProps = get_sketch(p5Ref.current, setText1, setText2);
    setProps(newProps);

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

`shield;

if (shield) shield = false
else shield = true`;
