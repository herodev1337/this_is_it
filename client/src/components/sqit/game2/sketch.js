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
  let shield = false;

  p.setup = () => {
    p.createCanvas(helpers.realWidth(90), helpers.view_2_px(55));
    player = new cls2.Player(
      p.width / 2,
      p.height / 2,
      (p.width + p.height) / 1000,
      p
    );
    enemy = new cls1.Enemy(-10, -10, p, player.r, player.angle);
    shot = new cls3.Shot(-20, -20, p, player.angle);
    for (let i = 0; i < 200; i++) {
      stars.push([p.random(0, p.width), p.random(0, p.height), 1]);
    }
  };

  p.draw = () => {
    // keyPressed()
    // console.log(p.keyCode)

    p.background(0, 99);
    p.push();
    p.noStroke();
    p.fill(255);
    for (let i of stars) {
      createStars(...i);
    }
    p.pop();
    if (p.keyIsDown(p.LEFT_ARROW)) {
      player.angle -= 0.06;
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      player.angle += 0.06;
    }
    player.update(p, enemies, player, shield,enemy, reset);
    enemy.update(p);
    player.edges(p);
    player.show(p, shield);
    enemy.draw(p, player);

    if (p.frameCount % 15 === 0 && p.frameCount <= 1500) {
      createEnemy();
    }
    shotfunc();
    enemyfunc();
  };

  p.keyPressed = () => {
    if (p.keyCode === 32) {
      player.fire(shots);
    }
    if (p.keyCode === 83) {
      shield = true;
    }
  }
  function shotfunc() {
    for (let shot of shots) {
      shot.draw(shots);
      shot.move(enemies, shield, enemy);
    }
  }

  function enemyfunc() {
    for (let enem of enemies) {
      enem.draw(p, player);
      enem.update(p);
      player.attract(enem);
      let playerDistance = p.dist(
        enem.pos.x,
        enem.pos.y,
        player.pos.x,
        player.pos.y
      );
      if (playerDistance < enemy.r + player.shieldSize + player.r && shield) {
        enem.vel.x *= -10;
        enem.vel.y *= -10;
        enem.pos.x -= player.shieldSize;
        enem.pos.y -= player.shieldSize;
      }
    }
  }

  function createEnemy() {
    enemies.push(
      new cls1.Enemy(p.random(0, p.width), p.random(0, p.height), p)
    );
  }
  function createStars(xPos, yPos, circleSize) {
    let x = xPos;
    let y = yPos;
    let size = circleSize;
    p.ellipse(x, y, size, size);
  }

  function reset() {

    shots = [];
    enemies = [];
    p.frameCount = 0;
    starColor = 255;
    player.pos.x = p.width / 2;
    player.pos.y = p.height / 2;
    p.print('You Lose !');
  }

  window.addEventListener("keypress", (e) => {
    
    e.preventDefault()
  })
};

const get_sketch = (ref) => {
  // return new p5(Sketch, ref);
  return new p5(Sketch, ref);
};

export default get_sketch;
