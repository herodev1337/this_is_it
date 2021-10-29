import {realWidth} from "./helpers.js"

// Ace Text-editor
class EditorSingleton {
    constructor(){
        if (EditorSingleton.instance instanceof EditorSingleton) return EditorSingleton.instance

        let [editor, editor2] = createEditor()
        this.editor = editor
        this.editor2 = editor2
        EditorSingleton.instance = this
    }

    enterCallback(callback, editor="editor", keypress={ mac: "cmd-enter", win: "ctrl-enter" }) {
        this[editor].commands.addCommand({
            name: "...",
            exec: callback,
            bindKey: keypress,
          });
    }


}

const createEditor = () => {
  let editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

  editor.setShowPrintMargin(false);
  editor.setOption({
    wrap: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    behavioursEnabled: true,
    hScrollBarAlwaysVisible: false,
    vScrollBarAlwaysVisible: false,
  });

  $("#editor").width(realWidth(90));
  $("#editor").height("50vh");

  let editor2 = ace.edit("editor2");
  editor2.setTheme("ace/theme/monokai");
  editor2.session.setMode("ace/mode/javascript");
  editor2.session.setUseWorker(false);

  editor2.setOption({
    wrap: true,
    highlightActiveLine: false,
    highlightGutterLine: false,
    hScrollBarAlwaysVisible: false,
    vScrollBarAlwaysVisible: false,
  });
  editor2.setShowPrintMargin(false);
  editor2.renderer.$cursorLayer.element.style.display = "none";
  editor2.setReadOnly(true);

  $("#editor2").width(realWidth(90));
  $("#editor2").height("5vh");

  return [editor, editor2]
};




export {createEditor, EditorSingleton}