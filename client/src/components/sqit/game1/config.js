import p5 from 'p5';

import {sketch_builder} from "./sketch"
import * as helpers from '../helpers';


const get_sketch = (ref, setText1, setText2) => {
    let isExtraTxt = false;
  
    const myp5 = new p5(sketch_builder, ref);
  
    const editorGetter = value => {
      const ret = helpers.get_pureReturn(value, true);
      const searchedVariable = isExtraTxt ? 'interval' : 'gate';
  
      setText1(value);
      setText2(
        `Output:\n${ret ? helpers.get_userCode(value, searchedVariable)[0] : ret}`
      );
  
      if (!helpers.get_validation(value, 'open', 'gate')) {
        myp5.anim = false;
        return;
      } else myp5.anim = true;
  
      if (!isExtraTxt && myp5.anim) {
        isExtraTxt = true;
        setText1(
          value +
            `\n\n// Sikes, please click the green light for 2 seconds to open the door.\nlet interval = 4`
        );
      }
      const [userInterval, status] = helpers.get_userCode(value, 'interval');
      myp5.interval = status ? userInterval : 4;
    };
  
    return {
      p5: myp5,
      getter: editorGetter,
    };
  };
  
  const ed1_txt = `// Open the gate to enter the next challenge\n\nlet gate ="close";\ngate`;
  const ed2_txt = `Output:\nclose`;
  
  export {ed1_txt, ed2_txt}
  export default get_sketch;
  