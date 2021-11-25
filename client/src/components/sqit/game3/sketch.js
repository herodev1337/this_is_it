import p5 from 'p5';
import $ from 'jquery';
import backgroundjson from './Sprites/Background.json';
import backgroundpng from './Sprites/Spritesheet.png';
import frogjson from './Sprites/frog.json';
import frogpng from './Sprites/frog.png';
import backgroundimg from './Sprites/Background.png';

import * as helpers from '../helpers.js';
import * as cls1 from './frog';
import * as cls2 from './background';
let Sketch = (p) => {
  let bg;
  let frog;
  let object = false;
  p.isObjectActive = false;
  const activate = {
    walk: false,
    jump: false,
    left: false,
  }
  let bgSprites = [];
  let frogSprites = [];
  let bgdata, spritedata, bgsheet, spritesheet, backgroundsheet;
  p.preload = () => {
    bgdata = backgroundjson//p.loadJSON(backgroundjson);
    spritedata = frogjson//p.loadJSON(frogjson);
    bgsheet = p.loadImage(backgroundpng);//backgroundpng
    spritesheet = p.loadImage(frogpng);
    backgroundsheet = p.loadImage(backgroundimg);
  };
  p.setup = () => {
    p.createCanvas(helpers.realWidth(90), helpers.view_2_px(55));
    bg = new cls2.Background();
    frog = new cls1.Frog(p,
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
    
    bg.draw(p,frog,backgroundsheet,bgSprites);
    p.push()
    p.imageMode(p.CENTER)
    if(p.isObjectActive){
      object = true;
      p.image(bgSprites[0],p.mouseX,p.mouseY,p.width/4,frog.size*2)
    }
    else{
      object = false;
    }
    p.pop()
    frog.update(p);
    frog.hitBox(p,activate,object);
    frog.create(p,activate,frogSprites);
    frog.move(p,activate);
    
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
  window.addEventListener("keypress", (e) => {
    if(e.key === ' ' && e.target == document.body) e.preventDefault()
  })
};

export { Sketch };
