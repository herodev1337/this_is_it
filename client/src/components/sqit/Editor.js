import React, { useLayoutEffect, useState } from 'react';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import AceEditor from 'react-ace';

import * as helpers from './helpers.js';


const getEditorSizes = () => {
  const [size, setSize] = useState([[0, 0], [0,0]]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([
        [helpers.realWidth(90), helpers.view_2_px(50)],
        [helpers.realWidth(90), helpers.view_2_px(5)]
      ]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Editor = ({setter1, setter2, getter}) => {

  const [[ed1_width, ed1_height], [ed2_width, ed2_height]] = getEditorSizes();

  return (
    <div className="editorHolder">
      <AceEditor
        className="editor1"
        mode="javascript"
        theme="monokai"
        showPrintMargin={false}
        onChange={getter}
        height={ed1_height + "px"}
        width={ed1_width + "px"}
        value={setter1()}
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
        height={ed2_height + "px"}
        width={ed2_width + "px"}
        readOnly={true}
        showPrintMargin={false}
        showGutter={false}
        value={setter2()}
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