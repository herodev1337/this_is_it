import p5 from 'p5';
import $ from 'jquery';
import backgroundjson from './Sprites/Background.json';
import backgroundpng from './Sprites/Spritesheet.png';
import frogjson from './Sprites/frog.json';
import frogpng from './Sprites/frog.png';
import backgroundimg from './Sprites/Background.png';
//testtt
import * as helpers from '../helpers';
import * as cls1 from './frog';
import * as cls2 from './background';

import {P5Extend3} from "../types"

let Sketch = (p:P5Extend3) => {
  let bg:cls2.Background;
  let frog:cls1.Frog;
  let widthR = p.width;
  let widthL = 0;
  let opacity = 0;
  let win = false;
  let object = false;
  p.isObjectActive = false;
  const activate = {
    walk: false,
    jump: false,
    left: false,
  };
  let bgSprites:p5.Image[] = [];
  let frogSprites:p5.Image[] = [];
  let bgdata:typeof backgroundjson, 
      spritedata:typeof frogjson, 
      bgsheet:p5.Image, 
      spritesheet:p5.Image, 
      backgroundsheet:p5.Image;
  
  
  p.preload = () => {
    bgdata = backgroundjson;
    spritedata = frogjson;
    bgsheet = p.loadImage(backgroundpng);
    spritesheet = p.loadImage(frogpng);
    backgroundsheet = p.loadImage(backgroundimg);
  };
  p.setup = () => {
    p.createCanvas(helpers.realWidth(90), helpers.view_2_px(55));
    bg = new cls2.Background();
    frog = new cls1.Frog(
      p,
      0 + p.width / 20,
      p.height - (p.width + p.height) / 30,
      (p.width + p.height) / 30
    );
    let frames = spritedata.frames;
    for (let i = 0; i < frames.length; i++) {
      let pos = frames[i].position;
      let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
      frogSprites.push(img);
    }
    let bgframes = bgdata.frames;
    for (let i = 0; i < bgframes.length; i++) {
      let pos = bgframes[i].position;

      let img = bgsheet.get(pos.x, pos.y, pos.w, pos.h);

      bgSprites.push(img);
    }
  };
  p.draw = () => {
    frog.update();
    bg.draw(p, frog, backgroundsheet, bgSprites);
    p.push();
    p.imageMode(p.CENTER);
    //draw the Object when true
    if (p.isObjectActive) {
      object = true;
      p.image(bgSprites[0], p.mouseX, p.mouseY, p.width / 4, frog.size * 2);
    } else {
      object = false;
    }
    p.pop();
    //----------------------------------------------------------------------------------
    frog.hitBox(p, activate, object);
    frog.create(p, activate, frogSprites);
    frog.move(p, activate);
    //win condition + win animations
    if (frog.pos.x >= p.width - p.width / 3) {
      win = true;
    }
    if (win) {
      p.push();
      opacity += 2;
      let winText = ' You Win !';
      let nextText = '>> Press Next <<';
      p.fill(255, opacity);
      p.textSize(p.width / 50);
      p.textAlign(p.CENTER);
      p.text(winText, p.width / 2, p.height / 2);
      p.pop();
      p.push();
      p.fill(255);
      p.rect(0, 0, widthL, p.height);
      if (widthL <= p.width / 2 && opacity > 200) {
        widthL += Math.round(p.width / 400);
      }
      p.fill(255);
      p.rect(p.width, 0, widthR, p.height);
      if (widthR >= -p.width / 2 && opacity > 200) {
        widthR -= Math.round(p.width / 400);
      }
      if (widthR <= -p.width / 2) {
        p.fill(0);
        p.textSize(p.width / 75);
        p.text(nextText, p.width - p.width / 9, p.height - p.height / 50);
      }
      p.pop();
    }
    //--------------------------------------------------------------------------------------
  };

  p.keyPressed = () => {
    if (p.key == ' ' && !activate.jump) {
      let jumpf = p.createVector(0, -(p.width + p.height) / 100);
      activate.jump = true;
      activate.walk = false;
      frog.applyForce(jumpf);
    }
  };
  // p.windowResized= () => {
  //   p.resizeCanvas(windowWidth, windowHeight);
  // }
  window.addEventListener('keypress', (e) => {
    if (e.key === ' ' && e.target == document.body) e.preventDefault();
  });
};

export { Sketch };
