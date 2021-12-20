import $, { get, type } from 'jquery';
import p5 from 'p5';
// import { EditorSingleton } from '../editor.js';
import * as helpers from '../helpers';

import {P5Extend5} from "../types"

let sketch_builder = (p:P5Extend5) => {
  let snake: Snake;
  let rez = 20;
  let food:p5.Vector;
  let w:number;
  let h:number;
  p.score = 0;
  p.rotten_ = true;
  window.addEventListener(
    'keydown',
    function (e) {
      if (
        ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
          e.code
        ) > -1
      ) {
        e.preventDefault();
      }
    },
    false
  );

  class Snake {
    body:p5.Vector[]
    xdir:number;
    ydir:number;
    len:number;

    constructor() {
      this.body = [];
      this.body[0] = p.createVector(p.floor(w / 2), p.floor(h / 2));
      this.xdir = 0;
      this.ydir = 0;
      this.len = 0;
    }

    setDir(x:number, y:number) {
      this.xdir = x;
      this.ydir = y;
    }

    update() {
      let head = this.body[this.body.length - 1].copy();
      this.body.shift();
      head.x += this.xdir;
      head.y += this.ydir;
      this.body.push(head);
    }

    grow() {
      if (!p.rotten_) {
        let head = this.body[this.body.length - 1].copy();
        this.len++;
        this.body.push(head);
        p.score++;
      }
    }

    endGame() {
      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      if (x > w || x < 1 || y > h || y < 1) {
        // console.log(x);
        foodLocation();
        return true;
      }
      for (let i = 0; i < this.body.length - 1; i++) {
        let part = this.body[i];
        if (part.x == x && part.y == y) {
          foodLocation();
          return true;
        }
      }
      return false;
    }

    eat(pos:{x:number, y:number}) {
      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      if (x == pos.x && y == pos.y) {
        this.grow();
        return true;
      }
      return false;
    }

    show() {
      for (let i = 0; i < this.body.length; i++) {
        p.fill(0);
        p.noStroke();
        p.rect(this.body[i].x, this.body[i].y, 1, 1);
      }
    }
  }

  function foodLocation() {
    let x = p.floor(p.random(w - w + 1, w - 1));
    let y = p.floor(p.random(h - h + 1, h - 1));

    food = p.createVector(x, y);
  }

  p.setup = () => {
    p.rectMode(p.CENTER);
    p.createCanvas(helpers.realWidth(90), helpers.view_2_px(50));
    p.ellipseMode(p.CENTER);
    w = p.floor(p.width / rez);
    h = p.floor(p.height / rez);
    p.frameRate(10);
    snake = new Snake();
    foodLocation();
  };

  document.onkeydown = checkKey;

  function checkKey(e:KeyboardEvent) {
    // e = e || window.event;

    if (e.keyCode == 38) {
      snake.setDir(0, -1);
    } else if (e.keyCode == 40) {
      snake.setDir(0, 1);
    } else if (e.keyCode == 37) {
      snake.setDir(-1, 0);
    } else if (e.keyCode == 39) {
      snake.setDir(1, 0);
    }
  }

  p.draw = () => {
    p.background($(':root').css('--color-navy-800'));

    p.scale(rez);

    if (snake.eat(food)) {
      foodLocation();
    }
    snake.update();
    snake.show();

    if (snake.endGame()) {
      p.background($(':root').css('--color-navy-800'));
      snake = new Snake();
      snake.update();
      snake.show();
    }

    p.noStroke();
    p.fill(255, 0, 0);
    p.rect(food.x, food.y, 1, 1);
  };
};
export { sketch_builder };
