import $, { get, type } from 'jquery';
import p5 from 'p5';
// import { EditorSingleton } from '../editor.js';
import * as helpers from '../helpers.js';
import { fields } from './tictactoe.js';

let sketch_builder = (p) => {
  let snake;
  let rez = 20;
  let food;
  let w;
  let h;
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
    constructor() {
      this.body = [];
      this.body[0] = p.createVector(p.floor(w / 2), p.floor(h / 2));
      this.xdir = 0;
      this.ydir = 0;
      this.len = 0;
    }

    setDir(x, y) {
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
      if (x > w - 1 || x < 1 || y > h - 1 || y < 1) {
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

    eat(pos) {
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
    p.frameRate(5);
    snake = new Snake();
    foodLocation();
  };

  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
      snake.setDir(0, -1);
    } else if (e.keyCode == '40') {
      snake.setDir(0, 1);
    } else if (e.keyCode == '37') {
      snake.setDir(-1, 0);
    } else if (e.keyCode == '39') {
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
