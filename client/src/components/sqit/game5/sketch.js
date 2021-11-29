// import $, { get, type } from 'jquery';
// import p5 from 'p5';
// // import { EditorSingleton } from '../editor.js';
// import * as helpers from '../helpers.js';
// import { fields } from './tictactoe.js';

// let snake;
// let rez = 20;
// let food;
// let w;
// let h;
// let score = 0;
// let rotten_ = true;

// const regex = new RegExp('.*');
// // const enterCallback = () => {
// //   const rotten = helpers.get_userCode(mainEditor.editor.getValue(), 'rotten');
// //   console.log(rotten);
// //   rotten_ = rotten;
// //   add_editor_text();
// // };

// // const add_editor_text = () => {
// //   let strout = mainEditor.editor2.getValue();
// //   strout = strout.replace(regex, '');
// //   if (score < 10)
// //     mainEditor.editor2.setValue(strout + `Output: Score = ${score}`);
// //   else mainEditor.editor2.setValue(strout + `Output: You did it!`);
// // };

// // const mainEditor = new EditorSingleton();
// // mainEditor.enterCallback(enterCallback);

// window.addEventListener(
//   'keydown',
//   function(e) {
//     if (
//       ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
//         e.code
//       ) > -1
//     ) {
//       e.preventDefault();
//     }
//   },
//   false
// );

// class Snake {
//   constructor() {
//     this.body = [];
//     this.body[0] = createVector(floor(w / 2), floor(h / 2));
//     this.xdir = 0;
//     this.ydir = 0;
//     this.len = 0;
//   }

//   setDir(x, y) {
//     this.xdir = x;
//     this.ydir = y;
//   }

//   update() {
//     let head = this.body[this.body.length - 1].copy();
//     this.body.shift();
//     head.x += this.xdir;
//     head.y += this.ydir;
//     this.body.push(head);
//   }

//   grow() {
//     if (!rotten_) {
//       let head = this.body[this.body.length - 1].copy();
//       this.len++;
//       this.body.push(head);
//       score++;
//       add_editor_text();
//     }
//   }

//   endGame() {
//     let x = this.body[this.body.length - 1].x;
//     let y = this.body[this.body.length - 1].y;
//     if (x > w - 1 || x < 1 || y > h - 1 || y < 1) {
//       foodLocation()
//       return true;
//     }
//     for (let i = 0; i < this.body.length - 1; i++) {
//       let part = this.body[i];
//       if (part.x == x && part.y == y) {
//         foodLocation()
//         return true;
//       }
//     }
//     return false;
//   }

//   eat(pos) {
//     let x = this.body[this.body.length - 1].x;
//     let y = this.body[this.body.length - 1].y;
//     if (x == pos.x && y == pos.y) {
//       this.grow();
//       return true;
//     }
//     return false;
//   }

//   show() {
//     for (let i = 0; i < this.body.length; i++) {
//       fill(0);
//       noStroke();
//       rect(this.body[i].x, this.body[i].y, 1, 1);
//     }
//   }
// }

// function foodLocation() {
//   let x = floor(random(w - w + 1, w - 1));
//   let y = floor(random(h - h + 1, h - 1));

//   food = createVector(x, y);
// }

// function setup() {
//   rectMode(CENTER);
//   let cnv = createCanvas(helpers.realWidth(90), helpers.view_2_px(50));
//   cnv.parent('canvasHolder');
//   ellipseMode(CENTER);
//   w = floor(width / rez);
//   h = floor(height / rez);
//   frameRate(5);
//   snake = new Snake();
//   foodLocation();
// }

// document.onkeydown = checkKey;

// function checkKey(e) {
//   e = e || window.event;

//   if (e.keyCode == '38') {
//     snake.setDir(0, -1);
//   } else if (e.keyCode == '40') {
//     snake.setDir(0, 1);
//   } else if (e.keyCode == '37') {
//     snake.setDir(-1, 0);
//   } else if (e.keyCode == '39') {
//     snake.setDir(1, 0);
//   }
// }

// function draw() {
//   background($(':root').css('--color-navy-800'));

//   scale(rez);

//   if (snake.eat(food)) {
//     foodLocation();
//   }
//   snake.update();
//   snake.show();

//   if (snake.endGame()) {
//     print('END GAME');
//     background($(':root').css('--color-navy-800'));
//     snake = new Snake();
//     snake.update();
//   snake.show();

//   }

//   noStroke();
//   fill(255, 0, 0);
//   rect(food.x, food.y, 1, 1);
// }

// function windowResized() {
//   resizeCanvas(helpers.realWidth(90), helpers.view_2_px(50));
// }

// window.setup = setup;
// window.draw = draw;
// window.windowResized = windowResized;
