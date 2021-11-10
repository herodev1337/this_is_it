import p5 from 'p5';
import $ from 'jquery';

import * as cls from './classes';
import * as helpers from '../helpers';

let Sketch = p => {
  p.anim = false;
  p.interval = 4;

  let on, anim, finished;

  let fps = 60;
  let interval = 180;
  let radius = 50;

  let redLight, greenLight, doors, backgroundDoors;
  let redCnt = 0;
  let greenCnt = 0;

  p.setup = () => {
    p.createCanvas(helpers.realWidth(90), helpers.view_2_px(55));
    p.frameRate(fps);
    p.textAlign(p.CENTER, p.CENTER);

    redLight = new cls.BlinkLight(p, radius * 2, [255, 0, 0], 1);
    greenLight = new cls.BlinkLight(p, radius * 2, [0, 255, 0]);

    backgroundDoors = new cls.SlidingDoors(
      p,
      $(':root').css('--color-navy-800')
    );
    doors = new cls.SlidingDoors(p, $(':root').css('--GuardRed'));

    p.textFont('Montserrat');
    p.textSize(50);
  };

  p.draw = () => {
    p.background($(':root').css('--CardBrown'));

    p.fill($(':root').css('--GuardRed'));
    p.noStroke();
    p.textStyle(p.BOLDITALIC);
    p.text('YOU DID IT', p.width / 2, p.height / 2);
    p.textStyle(p.BOLD);
    p.text('🎉', p.width / 2, p.height / 2 + 75);

    p.stroke($(':root').css('--color-navy-800'));
    backgroundDoors.show(p);
    if (finished) backgroundDoors.move(finished);

    // Strobing lights
    if (on) {
      greenCnt = 0;
      redLight.update(p.width / 3, p.height / 2);
      redLight.show(p);
    } else {
      redCnt = 0;
      greenLight.update((p.width / 3) * 2, p.height / 2);
      greenLight.show(p);
    }

    if (redLight.isPressed()) redCnt++;
    if (greenLight.isPressed()) greenCnt++;

    if (redCnt / fps > 2) console.log('Sry nicht der richtig mouse click :/');
    if (greenCnt / fps > 2) finished = true;

    //     // Sliding doors
    p.stroke(0);
    p.strokeWeight(1);
    doors.show(p);
    doors.move(p.anim);

    if (finished) {
      redLight.move();
      greenLight.move();
    }
    if (p.frameCount % p.interval == 0) on = !on;
  };
};

const get_sketch = ref => {
  const myp5 = new p5(Sketch, ref);

  const editorCallback = value => {
    console.log(value);
    myp5.anim = true;
  };

  return [myp5, editorCallback];
};

let editor_text = `// Open the gate to enter the next challenge\n\nlet gate ="close";\ngate`;
let editor2_text = `Output:\n'close'`;

export default get_sketch;
