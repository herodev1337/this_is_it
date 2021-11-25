import p5 from 'p5';

import { Sketch } from './sketch';
import * as helpers from '../helpers';

const get_sketch = (ref, setText1, setText2) => {
  const re = /let platform = {\n(?: +|\t)width: 100,\n(?: +|\t)height: 30,\n(?: +|\t)position: mouse,\n(?: +|\t)style: grasplatform\n};/;
  const myp5 = new p5(Sketch, ref);
  const editorGetter = (value) => {
    console.log(value.match(re))
    // console.log(helpers.get_userCode(value.match(re)[0], "shieldbreaker"));
    const ret = helpers.get_pureReturn(value, true);
    if(value.match(re)){
      myp5.isObjectActive = true;
    }
    else{
      myp5.isObjectActive = false;
    }
  };

  return {
    p5: myp5,
    getter: editorGetter,
  };
};

const ed1_txt = `//type: 
//let platform = {
//  width: 100,
//  height: 30,
//  position: mouse,
//  style: grasplatform
//};\n`;
const ed2_txt = `Output:\nclose`;

export { ed1_txt, ed2_txt };
export default get_sketch;
