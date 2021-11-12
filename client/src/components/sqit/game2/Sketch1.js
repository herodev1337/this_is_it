import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';

import get_sketch from './sketch';
import * as helpers from '../helpers.js';

import Editor from 'components/sqit/Editor';

const Sketch1 = () => {
  const p5Ref = useRef();
  const baseProps = {
    "p5": undefined,
    "getter": () => ""
  }
  const [editorProps, setProps] = useState(baseProps)
  const [textState1, setText1] = useState(`// It seems like our spaceship got no chance to survive the swarm of enemies...
// The enemy uses a shieldbreaker to deactivate our shield everytime we try to turn it on ...
// Create a if/else statement that turns our shield on(true) everytime it is turned off(false)
// and when our shield is turned on deactivate(false) the enemy shieldbreaker....
// Maybe this will outsmart the enemies...\n\nlet shield = false;\n\nlet shieldbreaker = true\n\nif(){
  
}else if(){
  
}`)
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
