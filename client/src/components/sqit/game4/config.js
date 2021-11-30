import p5 from 'p5';

import { sketch_builder } from './sketch';
import * as helpers from '../helpers';
import { fields } from './tictactoe';

let extraText = false;

const get_sketch = (ref, setText1, setText2) => {
  const myp5 = new p5(sketch_builder, ref);

  myp5.customResize = () => {
    myp5.setup()
  }

  const editorGetter = (value) => {
    if (!extraText) {
      const fields_ = helpers.get_userCode(value, 'fields');
      console.log(fields_);

      const KI_Mode = helpers.get_userCode(value, 'KI_Mode');

      myp5.KI_Mode_ = KI_Mode;
      if (!myp5.win && !myp5.playerWin) myp5.fields__ = fields_;
      if (myp5.KI_Mode_ === 'normal' || myp5.KI_Mode_ === 'easy')
        myp5.hardMode = false;

      // if (gameFinished) extraText = true;
      add_editor_text(fields_);
    }
    // setText1(value);
    const add_editor_text = (fields_) => {
      let str = value;
      console.log(value, fields_);
      // let strout = mainEditor.editor2.getValue();

      //   str = str.replace(regex, '');
      //   if (yourTurn) str = str.replace(regex_Current_Player, 'KIs turn');
      //   else {
      //     str = str.replace(regex_Current_KI, 'Players turn');
      //   }
      //   console.log(win, oneTime);
      //   if (!win) {
      //     console.log(mainEditor.editor.getSession().getAnnotations());
      //     console.log(str.match(regex_err));

      //     mainEditor.editor.setValue(str + `fields = [${fields_}];`);
      //     if (str.match(regex_err)) {
      //       console.log(str.match(regex_err));
      //       str = str.replace(regex, '');
      //       mainEditor.editor.setValue(str + `fields = [${fieldsReset}];`);
      //     }
      //   } else if (win === 2 && !oneTime) {
      //     mainEditor.editor2.setValue(strout + `Tie`);
      //     oneTime = true;
      //     fieldsReset = fields_;
      //   } else {
      //     if (!oneTime) {
      //       mainEditor.editor2.setValue(strout + `You did lose!`);
      //       oneTime = true;
      //       fieldsReset = fields_;
      //     }
      //   }
      //   if (win) {
      //     mainEditor.editor.setValue(str + `fields = [${fieldsReset}];`);
      //   }
      //   if (playerWin && !oneTime) {
      //     fieldsReset = fields_;
      //     mainEditor.editor2.setValue(strout + `You did it!`);
      //     oneTime = true;
      //   }
      //   if(playerWin){
      //     mainEditor.editor.setValue(str + `fields = [${fieldsReset}];`);
      //   }
      // };
    };
  };

  return {
    p5: myp5,
    getter: editorGetter,
  };
};

const ed1_txt = `//hm what should i do?.. maybe i complete this.\n//some people whispered me, the upper left field-position starts with the number 0..\n\n//KI starts...\n\nlet KI_Mode = "unbeatable"\n\nfields = [false,false,false,false,false,false,false,false,false];`;
const ed2_txt = `Output: `;

export { ed1_txt, ed2_txt };
export default get_sketch;

// const enterCallback = () => {
//   if (!extraText) {
//     const fields_ = helpers.get_userCode(
//       mainEditor.editor.getValue(),
//       'fields'
//     );

//     const KI_Mode = helpers.get_userCode(
//       mainEditor.editor.getValue(),
//       'KI_Mode'
//     );

//     KI_Mode_ = KI_Mode;
//     if(!win && !playerWin) fields__ = fields_;
//     if (KI_Mode_ === 'normal' || KI_Mode_ === 'easy') hardMode = false;

//     if (gameFinished) extraText = true;
//     add_editor_text(fields_);

//     valid = true;
//   }
// };

// const add_editor_text = fields_ => {
//   let str = mainEditor.editor.getValue();
//   let strout = mainEditor.editor2.getValue();

//   str = str.replace(regex, '');
//   if (yourTurn) str = str.replace(regex_Current_Player, 'KIs turn');
//   else {
//     str = str.replace(regex_Current_KI, 'Players turn');
//   }
//   console.log(win, oneTime);
//   if (!win) {
//     console.log(mainEditor.editor.getSession().getAnnotations());
//     console.log(str.match(regex_err));

//     mainEditor.editor.setValue(str + `fields = [${fields_}];`);
//     if (str.match(regex_err)) {
//       console.log(str.match(regex_err));
//       str = str.replace(regex, '');
//       mainEditor.editor.setValue(str + `fields = [${fieldsReset}];`);
//     }
//   } else if (win === 2 && !oneTime) {
//     mainEditor.editor2.setValue(strout + `Tie`);
//     oneTime = true;
//     fieldsReset = fields_;
//   } else {
//     if (!oneTime) {
//       mainEditor.editor2.setValue(strout + `You did lose!`);
//       oneTime = true;
//       fieldsReset = fields_;
//     }
//   }
//   if (win) {
//     mainEditor.editor.setValue(str + `fields = [${fieldsReset}];`);
//   }
//   if (playerWin && !oneTime) {
//     fieldsReset = fields_;
//     mainEditor.editor2.setValue(strout + `You did it!`);
//     oneTime = true;
//   }
//   if(playerWin){
//     mainEditor.editor.setValue(str + `fields = [${fieldsReset}];`);
//   }
// };
