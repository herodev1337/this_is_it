import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import p5 from 'p5';
// import 'regenerator-runtime/runtime'; // needs to be imported if async/await is beeing used
import Editor from 'components/sqit/Editor';
import * as helpers from './helpers';

// https://dotnet.github.io/docfx/ multi language doc generator


/** @module Sqit-General */

/**
 * Imports the P5 sketch based on the given string.
 * 
 * (We assume the imported config has a default export which is our 'get_sketch' function and 2 strings named 'ed1_txt' & 'ed2_txt'.)
 * 
 * We build a little regex to see if game1 to 6 match '$page'.
 * If not, we return the hell out of here.
 * If yes, require the needed config.js from the path associated with '$page'.
 * Then we return an object with the keys 'get_sketch, text1, text2' and there corrosponding function/strings.
 * 
 */
const import_sketch = (page:string) => {
  const re = /game[1-6]/g;
  if (!page.match(re)) return

  const mod = require(`./${page}/config`)
  return {
    get_sketch: mod.default,
    text1: mod.ed1_txt,
    text2: mod.ed2_txt
  }
};

/**
 * Main SQIT Component.
 * 
 * It's one big div that contains 2 divs holding a canvas element and 2 aceditor instances. 
 * The aceeditor instances are splitted into the main editor for text input and an output editor 
 * which is right under the main editor.
 * 
 * At the start we get the corrosponding sketch and initial text1/2.
 * After that we get a react reference which will go into our p5 parent div 
 * (the div which will hold the p5 canvas element later).
 * We also get 2 react states. They will represent the 2 texts that will go into the AceEditor instances.
 * 
 * We also create a new state that will hold the p5 instance 
 * and a function that will be called by the first ace editor instance.
 * 
 * In the useEffect hook we'll get our p5 instance and our text getter.
 * We also register some event listeners which will resize the canvas on resize events.
 * If a customResize property exists on the p5 instance we will also call that. 
 * It represents some custom resize functionality if needed.
 * 
 * The returned component calls the <Editor> which in fact creates 2 ace editor instances 
 * which will get the text1/2 state as value.
 * It also creates a div which will get our p5Ref and will hold the canvas element in the future.
 * If the setText1/2 gets used in the future it will update these components.
 * The getter gets called when the onChange event on the main ace editor gets fired 
 * (eg. if you type anything in the editor). 
 * It will receive the whole text of the editor in one string and we have to process it in the corrosponding config.
 * 
 * @see [Editor Component]{@link Editor}
 * @see [P5]{@link https://p5js.org/get-started/}
 * @see [AceEditor]{@link https://ace.c9.io/}
 * 
 * @component
 */
const Sketch = ():JSX.Element => {
  const {get_sketch, text1, text2} = import_sketch(useParams().game);
  const p5Ref = useRef();
  const [textState1, setText1] = useState(text1);
  const [textState2, setText2] = useState(text2);

  const [editorProps, setProps] = useState({
    p5: undefined,
    getter: (val:string) => '',
  });

  
  useEffect(() => {
    const newProps = get_sketch(p5Ref.current, setText1, setText2);
    setProps(newProps);

    window.addEventListener('resize', () =>{
      newProps.p5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))

      if (newProps.p5["customResize"]){
        newProps.p5.customResize()
      }
    });

    return () =>
      window.removeEventListener('resize', () =>
        newProps.p5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
      );
  }, []);

  return (
    <>
      <div id ="canvas" className="canvasHolder" ref={p5Ref}></div>
      <Editor
        setter1={textState1}
        setter2={textState2}
        getter={(value:string) => editorProps.getter(value)}
      />
    </>
  );
};

export default Sketch;