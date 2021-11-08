import React from 'react';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import AceEditor from 'react-ace';

const Editor = () => {
  function onChange(newValue) {
    console.log('change', newValue);
  }

  return (
    <>
      <AceEditor
        className="editor1"
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        height="500px"
      />
      <AceEditor
        className="editor1"
        mode="javascript"
        theme="monokai"
        // onChange={onChange}
        height="50px"
        readOnly={true}
        showPrintMargin={false}
        showGutter={false}
        setOptions={{
          wrap: true,
          highlightActiveLine: false,
          highlightGutterLine: false,
          hScrollBarAlwaysVisible: false,
          vScrollBarAlwaysVisible: false,
          readOnly: true,
          useWorker:false,
          showLineNumbers: false,
        //   maxLines:4
        }}
      />
    </>
  );
};

export default Editor;
