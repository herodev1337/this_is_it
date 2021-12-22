import p5 from 'p5';

import { Sketch } from './sketch';
import * as helpers from '../helpers';

import {P5Extend2} from "../types";


const get_sketch = (ref:HTMLElement, setText1:(v:string)=>void, setText2:(v:string)=>void) => {
  const re =
    /if\((?:!shield| +shield!| +!shield +|shield===false| +shield===false| +shield===false +| +shield +=== +false +)\)(?:{| +{|\n{|\n+ +{)\n(?: +||\t+)shield(?:=true| +=true| += +true);\n+}(?:else if| +else if +| +else if|else if +|\nelse if| +\nelse if|\n+else if +| +\nelse if +)\((?:shield| +shield|shield +| +shield +|shield===true| +shield===true|shield===true +| +shield===true +|shield +=== +true| +shield +=== +true +)\)(?:\n{|{| +{)\n+(?:\t+| +||)shieldbreaker(?:=false| +=false| += +false|= +false);\n+}/;

  const myp5:P5Extend2 = new p5(Sketch, ref);

  const editorGetter = (value:string) => {
    console.log(value.match(re));
    // console.log(helpers.get_userCode(value.match(re)[0], "shieldbreaker"));
    const ret = helpers.get_pureReturn(value, true);
    if (value.match(re)) {
      myp5.isBreakerActive = false;
    } else {
      myp5.isBreakerActive = true;
    }
  };

  return {
    p5: myp5,
    getter: editorGetter,
  };
};

const ed1_txt = `// It seems like our spaceship got no chance to survive the swarm of enemies...
// The enemy uses a shieldbreaker to deactivate our shield everytime we try to turn it on ...
// Create a if() statement that turns our shield on(true) if it is turned off(false)
// and after that create a else if() statement that deactivate(false) the enemy shieldbreaker when your shield is aktive(true)....
// When the shield is activ you can eliminate the enemies to win the game !\n\nlet shield = false;\n\nlet shieldbreaker = true\n\nif(){

}else if(){
  
}`;
const ed2_txt = `Output:\nclose`;

export { ed1_txt, ed2_txt };
export default get_sketch;
