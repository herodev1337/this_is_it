import $ from 'jquery';

import * as cls from './classes';
import * as helpers from '../helpers';

import {P5Extend1} from "../types";


/**
 * Builds the p5 sketch.
 * 
 * 
 * @param {object} p P5 instance. 
 */
let sketch_builder = (p:P5Extend1) => {
  p.anim = false;
  p.interval = 4;

  let on:boolean,
      finished:boolean;

  let fps = 60;
  let radius = 50;

  let redLight:cls.BlinkLight, 
      greenLight:cls.BlinkLight, 
      doors:cls.SlidingDoors, 
      backgroundDoors:cls.SlidingDoors;

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
    backgroundDoors.show();
    if (finished) backgroundDoors.move(finished);

    // Strobing lights
    if (on) {
      greenCnt = 0;
      redLight.update(p.width / 3, p.height / 2);
      redLight.show();
    } else {
      redCnt = 0;
      greenLight.update((p.width / 3) * 2, p.height / 2);
      greenLight.show();
    }

    if (redLight.isPressed()) redCnt++;
    if (greenLight.isPressed()) greenCnt++;

    if (redCnt / fps > 2) console.log('Sry nicht der richtig mouse click :/');
    if (greenCnt / fps > 2) finished = true;

    //     // Sliding doors
    p.stroke(0);
    p.strokeWeight(1);
    doors.show();
    doors.move(p.anim);

    if (finished) {
      redLight.move();
      greenLight.move();
    }
    if (p.frameCount % p.interval == 0) on = !on;
  };
};

export {sketch_builder}