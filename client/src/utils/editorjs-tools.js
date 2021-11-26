// These are the tools supported by the EditorJS-React-Renderer library
import Paragraph from '@editorjs/paragraph'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import CodeBox from '@bomdi/codebox'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import SimpleImage from '@editorjs/simple-image'
import Embed from '@editorjs/embed'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
// import Video from '@editorjs/video' //! Requires backend interface
// import Image from '@editorjs/image' //! Requires backend interface

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  header: Header,
  list: List,
  table: Table,
  image: SimpleImage, //TODO: implement custom renderer
  embed: Embed,
  warning: Warning,
  codebox: CodeBox,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  // image: Image,
  // video: Video,
}