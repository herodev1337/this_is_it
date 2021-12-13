import * as React from 'react';
import { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import { LogLevels } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../../utils/editorjs-tools';

function Editor({ holder, mount }: {holder: string | HTMLElement, mount: React.Dispatch<any>}) {
  useEffect(() => {
    mount(new EditorJS({
      holder: holder,
      tools: EDITOR_JS_TOOLS,
      minHeight: 100,
      // logLevel: LogLevels.ERROR,
    }));
  }, []);

  return (
    <div
      id={typeof holder === 'string' ? holder : holder.id}
      style={{
        padding: '10px',
      }}
    ></div>
  );
}

export default Editor;
