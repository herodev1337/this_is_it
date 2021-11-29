import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../../utils/editorjs-tools';

function Editor({ holderId, mount }) {
  useEffect(() => {
    mount(new EditorJS({
      holder: holderId,
      tools: EDITOR_JS_TOOLS,
      minHeight: 100,
      logLevel: 'ERROR',
    }));
  }, []);

  return (
    <div
      id={holderId}
      style={{
        padding: '10px',
      }}
    ></div>
  );
}

export default Editor;
