import React, { useLayoutEffect, useState } from 'react';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import AceEditor from 'react-ace';

import * as helpers from './helpers';

import {Editor} from "./types"


// /** @namespace sqit */
/** @module Sqit-General */

/**
 * This functions initializes the editor sizes as a react state of nested arrays.
 * We useLayoutEffect here to wait for the ui to load in first.
 * We than grab the acutal width and height of both editors and return them.
 * We also register an event listener for the resize event to update the sizes of both editors.
 *
 * @return {number[][]} Array containing 2 tuples with height & width for both editors.
 */
const getEditorSizes = ():number[][] => {
  const [size, setSize] = useState([
    [0, 0],
    [0, 0],
  ]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([
        [helpers.realWidth(90), helpers.view_2_px(50)],
        [helpers.realWidth(90), helpers.view_2_px(5)],
      ]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

/**
 * Main Editor Component.
 *
 * There is a main div holding both editor instances the rest is managed by AceEditor. We only supply 2 things.
 *
 * 2 Setters strings which will go into the 'value' property of both editor instances.
 * These will be watched and updated by react when we call the setText1/2 functions somewhere else in the code.
 * These allow us to control what's going on in the editors.
 *
 * 1 Getter function which will go into the 'onChange' event on the first/main editor.
 * This function gets called when the user types something into the main editor.
 * The value it supplies will be all the text in the main editor.
 *
 * @see [AceEditor]{@link https://ace.c9.io/}
 *
 * @example
 * const [text1,setText1] = useState("");
 * const [text2,setText2] = useState("");
 * 
 * const getter = (editorText)=>{
 *    if (validate(editorText)) {
 *        setText1("Some information")    
 *    } else {
 *        setText2("Some output")
 *    }
 * }
 *
 * return <Editor setter1={setter1} setter2={setter2} getter={getter} />
 */
const Editor = ({ setter1, setter2, getter}: Editor):JSX.Element => {
  const [[ed1_width, ed1_height], [ed2_width, ed2_height]] = getEditorSizes();

  return (
    <div className="editorHolder">
      <AceEditor
        className="editor1"
        mode="javascript"
        theme="monokai"
        showPrintMargin={false}
        onChange={getter}
        height={ed1_height + 'px'}
        width={ed1_width + 'px'}
        value={setter1}
        setOptions={{
          wrap: true,
          highlightActiveLine: false,
          highlightGutterLine: false,
          hScrollBarAlwaysVisible: false,
          vScrollBarAlwaysVisible: false,
        }}
      />
      <AceEditor
        className="editor1"
        mode="javascript"
        theme="monokai"
        height={ed2_height + 'px'}
        width={ed2_width + 'px'}
        readOnly={true}
        showPrintMargin={false}
        showGutter={false}
        value={setter2}
        setOptions={{
          wrap: true,
          highlightActiveLine: false,
          highlightGutterLine: false,
          hScrollBarAlwaysVisible: false,
          vScrollBarAlwaysVisible: false,
          readOnly: true,
          useWorker: false,
          // showLineNumbers: false,
        }}
      />
    </div>
  );
};

export default Editor;
