import p5 from 'p5';

import { sketch_builder } from './sketch';
import * as helpers from '../helpers';
import { fields } from './tictactoe';

const regex = new RegExp('fields(.|\n)*');
const regex_Current_Player = new RegExp('KI starts');
const regex_Current_KI = new RegExp('Players turn');
const regex_err1 = new RegExp(
  'fieldss*=s*.*[s*ReferenceError:s* .*s* is s*nots* defineds*];'
);
const regex_err2 = new RegExp(
  "fieldss*=s*.*[s*SyntaxError: s*Unexpecteds*tokens* ':'s*];"
);
const regex_err = new RegExp(`${regex_err1 || regex_err2}`);

let extraText = false;
let gameFinished = false;
let fieldsReset;
let oneTime = false;

const get_sketch = (ref, setText1, setText2) => {
  const myp5 = new p5(sketch_builder, ref);
  
  const editorGetter = (value) => {
    if (gameFinished) extraText = true;

    const add_editor_text = (fields_) => {
      let str = value;
      // fields_.pop()
      // fields_ = fields_[0]

      str = str.replace(regex, '');
      if (myp5.yourTurn) str = str.replace(regex_Current_Player, 'KIs turn');
      else {
        str = str.replace(regex_Current_KI, 'Players turn');
      }
      if (!myp5.win) {
        // console.log(str, fields_)
        setText1(str + `fields = [${fields_}];`);
        if (str.match(regex_err)) {
          str = str.replace(regex, '');
          setText1(str + `fields = [${fieldsReset}];`);
        }
        // console.log("win", myp5.win, "playerWin", myp5.playerWin)
      } else if (myp5.win === 2 && !oneTime) {
        console.log("Tie")
        setText2(`Output: Tie`);
        oneTime = true;
        fieldsReset = fields_;
      } else {
        if (!oneTime) {
        console.log("Loose")
          setText2(`Output: You did lose!`);
          oneTime = true;
          fieldsReset = fields_;
      // add_editor_text(fields_);
        }
      }
      if (myp5.win) {
        setText1(str + `fields = [${fieldsReset}];`);
      }
      if (myp5.playerWin && !oneTime) {
        console.log("Win")
        fieldsReset = fields_;
        setText2(`Output: You did it!`);
        
        oneTime = true;
      }
      if (myp5.playerWin) {
        setText1(str + `fields = [${fieldsReset}];`);
      }
    };
    
    if (!extraText) {
      const [fields_, status] = helpers.get_userCode(value, 'fields');
      
      if (!status) return

      if (fields_.filter((val) => !!val || val === false).length !== 9) return

      // console.log(fields_.filter((val) => !!val || val === false).length)

      const [KI_Mode, _] = helpers.get_userCode(value, 'KI_Mode');

      myp5.KI_Mode_ = KI_Mode;
      // console.log(fields_.includes(undefined));

    

      // if(fields_[0].includes(undefined)) return
      // console.log(fields_);
      // console.log(temp.length);
      if (!myp5.win && !myp5.playerWin) myp5.fields__ = fields_;
      if (myp5.KI_Mode_ === 'normal' || myp5.KI_Mode_ === 'easy')
        myp5.hardMode = false;
      
      // console.log(myp5.hardMode)
      add_editor_text(fields_);
    }
  };
  // setText1(value);

  return {
    p5: myp5,
    getter: editorGetter,
  };
};

const ed1_txt = `//hm what should i do?.. maybe i complete this.\n//some people whispered me, the upper left field-position starts with the number 0..\n\n//KI starts...\n\nlet KI_Mode = "unbeatable";\n\nfields = [false,false,false,false,false,false,false,false,false];`;
const ed2_txt = `Output: `;

export { ed1_txt, ed2_txt };
export default get_sketch
