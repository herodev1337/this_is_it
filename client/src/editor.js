import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
window.jQuery = $;
window.$ = $;

const editor = new EditorJS({ 
    holder: 'editorjs', 
    tools: { 
      header: Header, 
      list: List 
    },
  })
  
    console.log(post)
  $('#save').click(() => {
      editor.save().then((outputData) => {
          console.log('Article data: ', outputData)
          console.log(typeof outputData)
        }).catch((error) => {
          console.log('Saving failed: ', error)
        });
  })