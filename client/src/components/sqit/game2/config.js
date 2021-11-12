import p5 from 'p5';

import {Sketch} from "./sketch"
import * as helpers from '../helpers';


const get_sketch = (ref, setText1, setText2) => {
  const editor_text = `// It seems like our spaceship got no chance to survive the swarm of enemies...
// The enemy uses a shieldbreaker to deactivate our shield everytime we try to turn it on ...
// Create a if/else statement that turns our shield on(true) everytime it is turned off(false)
// and when our shield is turned on deactivate(false) the enemy shieldbreaker....
// Maybe this will outsmart the enemies...\n\nlet shield = false;\n\nlet shieldbreaker = true\n\nif(){

}else if(){

}`;
  const editor2_text = `Output:\n'close'`;
  const editor2_temp = `Output:\n`
  let isExtraTxt = false;
  let isGateOpen = false;

  const myp5 = new p5(Sketch, ref);


  const editorGetter = value => {
    console.log(helpers.get_userCode(value, '[shield, shieldbreaker]'))

    const ret = helpers.get_pureReturn(value, true)
    const searchedVariable = isExtraTxt ? "interval" : "gate"
    // myp5.isBreakerActive = false
    setText1(value)
    setText2(`Output:\n${ret? helpers.get_userCode(value, searchedVariable)[0] : ret}`);

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
  
  const ed1_txt = `// It seems like our spaceship got no chance to survive the swarm of enemies...
  // The enemy uses a shieldbreaker to deactivate our shield everytime we try to turn it on ...
  // Create a if/else statement that turns our shield on(true) everytime it is turned off(false)
  // and when our shield is turned on deactivate(false) the enemy shieldbreaker....
  // Maybe this will outsmart the enemies...\n\nlet shield = false;\n\nlet shieldbreaker = true\n\nif(){
  
  }else if(){
  
  }`
  const ed2_txt = `Output:\nclose`;
  
  export {ed1_txt, ed2_txt}
  export default get_sketch;
  