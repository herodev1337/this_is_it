import p5 from 'p5';
import {Player} from "./player"

class Enemy {
  r: number;
  angle: number;

  pos:p5.Vector;
  acc:p5.Vector;
  vel:p5.Vector;

  color:number;
  shieldSize:number;

  constructor(x: number, y: number, p: p5, r=0, angle=0,) {
    this.pos = p.createVector(x, y);
    this.acc = p.createVector(0, 0);
    this.vel = p.createVector(0, 0);
    this.r = r;
    this.color = 200;
    this.angle = angle;
  }
  draw(p:p5, player:Player) {
    p.push();
    p.noStroke();
    if (p.frameCount % 120 < 60) {
      this.shieldSize -= 0.15;
      this.color -= 4;
    } else {
      this.color += 4;
    }
    p.fill(this.color, 0, 0);
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.angle);
    p.ellipse(0, 0, player.r);
    p.triangle(
      -player.r / 2,
      -player.r,
      -player.r / 2,
      player.r,
      player.r / 4,
      0
    );
    p.pop();
  }
  applyForce(force:p5.Vector) {
    this.acc.add(force);
  }
  update(p:p5) {
    this.angle = this.vel.heading();
    this.vel.limit(p.random(3, 10));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
}
export { Enemy };
