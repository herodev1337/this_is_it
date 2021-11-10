import p5 from 'p5';
import $ from 'jquery';
import * as helpers from '../helpers.js';
import * as cls1 from './enemy';
import * as cls2 from './player';
import * as cls3 from './shot';

let Sketch = (p) => {
  p.anim = false;
  p.interval = 4;

  let on, anim, finished;
  let shots = [];
  let enemies = [];
  let stars = [];
  let player;
  let enemy;
  let shot;
  let starColor = 255;
  shield = false;

  p.setup = ()=> {
    p.createCanvas(helpers.realWidth(90), helpers.view_2_px(55));
    player = new Player(p.width / 2, p.height / 2, (p.width + p.height) / 1000);
    enemy = new Enemy(-10, -10);
    for (let i = 0; i < 200; i++) {
      stars.push([p.random(0, p.width), p.random(0, p.height), 1]);
    }
  }

  p.draw =()=> {
    p.background(0, 99);
    p.push();
    p.noStroke();
    p.fill(255);
    for (let i of stars) {
      createStars(...i);
    }
    p.pop();
    if (p.keyIsDown(LEFT_ARROW)) {
      player.angle -= 0.06;
    } else if (p.keyIsDown(RIGHT_ARROW)) {
      player.angle += 0.06;
    }
    player.update();
    enemy.update();
    player.edges();
    player.show();
    enemy.draw();

    if (p.frameCount % 15 === 0 && p.frameCount <= 1500) {
      createEnemy();
    }
    shotfunc();
    enemyfunc();
  }

  function keyPressed() {
    if (p.key === ' ') {
      player.fire();
    }
    if (p.key === 's') {
      shield = true;
    }
  }
  function shotfunc() {
    for (let shot of shots) {
      shot.draw();
      shot.move();
    }
  }

  function enemyfunc() {
    for (let enemy of enemies) {
      enemy.draw();
      enemy.update();
      player.attract(enemy);
      let playerDistance = p.dist(
        enemy.pos.x,
        enemy.pos.y,
        player.pos.x,
        player.pos.y
      );
      if (playerDistance < enemy.r + player.shieldSize + player.r && shield) {
        enemy.vel.x *= -10;
        enemy.vel.y *= -10;
        enemy.pos.x -= 10;
        enemy.pos.y -= 10;
      }
    }
  }

  function createEnemy() {
    enemies.push(new Enemy(random(0, width), random(0, height)));
  }
  function createStars(xPos, yPos, circleSize) {
    let x = xPos;
    let y = yPos;
    let size = circleSize;
    p.ellipse(x, y, size, size);
  }
};
