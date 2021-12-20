import p5 from 'p5';

import {sketch_builder} from "./sketch"
import * as helpers from '../helpers';

import {P5Extend1} from "../types";


/**
 * Builds a p5 instance and connects it with the main editor.
 *
 * @param {Object} ref React ref object holding the div where the p5 canvas should be placed
 * @param {function} setText1 Text setter for main editor
 * @param {function} setText2 Text setter for output editor
 * @returns {object} An object containing the P5 instance and the main editor getter
 */
const get_sketch = (ref:HTMLElement, setText1:(v:string)=>void, setText2:(v:string)=>void) => {
    let isExtraTxt = false;
  
    const myp5:P5Extend1 = new p5(sketch_builder, ref);                    //! required
    // const myp5 = {..._p5, anim:false, interval:5}
  
    const editorGetter = (value:string) => {                               //! required
      const ret = helpers.get_pureReturn(value, true);
      const searchedVariable = isExtraTxt ? 'interval' : 'gate';
  
      console.log(value)
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
      myp5.interval = status ? parseInt(userInterval) : 4;
    };
  
    return {                                                      //! required
      p5: myp5,
      getter: editorGetter,
    };
  };
  
  const ed1_txt = `// Open the gate to enter the next challenge\n\nlet gate ="close";\ngate`;
  const ed2_txt = `Output:\nclose`;
  
  export {ed1_txt, ed2_txt}
  export default get_sketch;
  