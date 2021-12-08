import p5 from 'p5';

import { sketch_builder } from './sketch';
import * as helpers from '../helpers';
import { fields } from './tictactoe';

const regex_err1 = new RegExp(
  'fieldss*=s*.*[s*ReferenceError:s* .*s* is s*nots* defineds*];'
);
const regex_err2 = new RegExp(
  "fieldss*=s*.*[s*SyntaxError: s*Unexpecteds*tokens* ':'s*];"
);
const regex_err = new RegExp(`${regex_err1 || regex_err2}`);
let score = 0;
const get_sketch = (ref, setText1, setText2) => {
  const myp5 = new p5(sketch_builder, ref);

  const editorGetter = (value) => {
    const add_editor_text = () => {
      if (myp5.score <= 10) setText2(`Output: Score = ${score}`);
      else setText2(`Output: You did it!`);
    };
    const [rotten, status] = helpers.get_userCode(value, 'rotten');

    if (!status) return;

    console.log(rotten);
    myp5.rotten_ = rotten;
    // add_editor_text();
  };

  return {
    p5: myp5,
    getter: editorGetter,
  };
};

const ed1_txt = `//tastes rotten..\n\nlet rotten = true\nlet abilityToEat = true\n\nwhile(rotten) abilityToEat = false`;
const ed2_txt = `Output: `;

export { ed1_txt, ed2_txt };
export default get_sketch;
