// tools.js
import Paragraph from '@editorjs/paragraph'
import Table from '@editorjs/table'
import NestedList from '@editorjs/nested-list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import SimpleImage from '@editorjs/simple-image'
import Embed from '@editorjs/embed'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
// import LinkTool from '@editorjs/link' //! Requires backend interface
// import Image from '@editorjs/image' //! Requires backend interface

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  header: Header,
  list: NestedList,
  table: Table,
  image: SimpleImage, 
  embed: Embed,
  warning: Warning,
  code: Code,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  // linkTool: LinkTool,
  // image: Image,
}