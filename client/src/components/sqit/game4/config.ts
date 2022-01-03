import p5 from 'p5';

import { sketch_builder } from './sketch';
import * as helpers from '../helpers';

import {P5Extend4} from "../types"

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
let fieldsReset:string;
let oneTime = false;

/**
 * At the start of the function we define 'extraText', 
 * this variable will track if the {1,2,...,n} stage was already initialised, 
 * until the game gets interrupted by an end of the game.
 * 
 * First we get the value of let KI_Mode. 
 * If the value is "unbeatable", refering to the conditions of the game Tic-Tac-Toe, you can not win. 
 * If the value is "normal" or "easy", the variable hardMode will be false and you could win the game.
 * 
 * Next we build the P5 instance and define the 'editorGetter' function.
 * With every call getting the current main editor value, we get fields = [false, false, ..., n], update and validate it.
 * We'll stop updating and validating, if the game was interrupted by an end of the game, 
 * updating the second editor (output editor) with current following possible stages: 
 *     - Output: You did it!
 *     - Output: You did loose!
 *     - Output: Tie!
 * Is any of these s
 * 
 * @see [sketch_builder]{@link sketch}
 * @see [P5]{@link https://p5js.org/get-started/}
 * @see [Tic-Tac-Toe]{@link https://wikipedia.org/wiki/Tic-Tac-Toe}
 * 
 * @param {Object} ref React ref object holding the div where the p5 canvas should be placed
 * @param {function} setText1 Text setter for main editor
 * @param {function} setText2 Text setter for output editor
 * @returns {object} An object containing the P5 instance and the main editor getter
 */
const get_sketch = (ref:HTMLElement, setText1:(v:string)=>void, setText2:(v:string)=>void) => {
  const myp5:P5Extend4 = new p5(sketch_builder, ref);

  myp5.set_win = (win:boolean|number = true, playerWin = true) => {
    myp5.win = true;
    if (win) setText2(`Output: You did lose!`);

    if (win === 2) setText2(`Output: Tie!`);

    if (playerWin && !win && !(win === 2)) setText2(`Output: You did it!`);
  };

  const editorGetter = (value:string) => {
    if (gameFinished) extraText = true;

    const add_editor_text = (fieldsSet:string) => {
      let str = value;
      // fieldsSet.pop()
      // fieldsSet = fieldsSet[0]

      str = str.replace(regex, '');
      if (myp5.yourTurn) str = str.replace(regex_Current_Player, 'KIs turn');
      else {
        str = str.replace(regex_Current_KI, 'Players turn');
      }
      if (!myp5.win) {
        // console.log(str, fieldsSet)
        setText1(str + `fields = [${fieldsSet}];`);
        if (str.match(regex_err)) {
          str = str.replace(regex, '');
          setText1(str + `fields = [${fieldsReset}];`);
          //
        }
        // console.log("win", myp5.win, "playerWin", myp5.playerWin)
      } else if (myp5.win === 2 && !oneTime) {
        console.log('Tie');
        setText2(`Output: Tie!`);
        oneTime = true;
        fieldsReset = fieldsSet;
      } else {
        if (!oneTime) {
          console.log('Loose');
          setText2(`Output: You did lose!`);
          oneTime = true;
          fieldsReset = fieldsSet;
          // add_editor_text(fields_);
        }
      }

      if (myp5.win) {
        setText1(str + `fields = [${fieldsReset}];`);
      }
      if (myp5.playerWin && !oneTime) {
        console.log('Win');
        fieldsReset = fieldsSet;
        setText2(`Output: You did it!`);

        oneTime = true;
      }
      if (myp5.playerWin) {
        setText1(str + `fields = [${fieldsReset}];`);
      }
    };

    if (!extraText) {
      const [fields_, status] = helpers.get_userCode(value, 'fields');

      if (!status) return;

      if (fields_.filter((val:boolean) => !!val || val === false).length !== 9) return;

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
      console.log(myp5.win);
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
export default get_sketch;
