import p5 from 'p5';
import * as cls3 from './shot';
import {Enemy} from './Enemy';


class Player {

  pos:p5.Vector;
  vel:p5.Vector;
  acc:p5.Vector;
  size:number;
  r:number;
  angle:number;
  shieldSize:number;
  shieldColor:number;
  p:p5;

  v1:number;
  v2:number;
  direction:p5.Vector;
  dist:number;
  correction:number;

  constructor(x:number, y:number, s:number, p: p5) {
    this.pos = p.createVector(x, y);
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.size = s;
    this.r = p.sqrt(this.size) * 10;
    this.angle = 0;
    this.shieldSize = this.r;
    this.shieldColor = 100;
    this.p = p;
  }
  edges(p:p5) {
    if (this.pos.y >= p.height - this.r) {
      this.pos.y = p.height - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= p.width - this.r) {
      this.pos.x = p.width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }
  fire(shots:any) {
    shots.push(new cls3.Shot(this.pos.x, this.pos.y, this.p, this.angle));
  }
  attract(enemy:Enemy) {
    let force = p5.Vector.sub(this.pos, enemy.pos);
    let distanceSq = force.magSq();
    let G = 0.005;
    let strength = 0.2;
    force.setMag(strength);
    enemy.applyForce(force);
  }
  update(p:p5, enemies:Enemy[], player:any, shield:boolean,enemy:any, func:()=>void) {
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.mult(2);
    if (p.keyIsDown(p.UP_ARROW)) {
      this.vel.mult(3);
    }
    this.pos.add(this.vel);
    for (let enem of enemies) {
      let playerDistance = p.dist(
        enem.pos.x,
        enem.pos.y,
        player.pos.x,
        player.pos.y
      );
      if (playerDistance < enemy.r + player.r / 2 && !shield) {
        // reset();
        func()
      }
    }
  }
  collision(other:any) {
    this.v1 = 0;
    this.v2 = 0;
    this.direction = p5.Vector.sub(other.pos, this.pos)
    this.dist = this.direction.mag()
    this.direction.normalize();
    //this is 60 because that is the radius you give them times two
    this.correction = ((this.shieldSize+this.r)*2)-this.dist;
    
    other.pos.add(p5.Vector.mult(this.direction,this.correction/2))
    this.v1 = this.direction.dot(this.vel)
    this.v2 = this.direction.dot(other.vel)
    this.direction.mult(this.v1-this.v2)
    other.vel.add(p5.Vector.mult(this.direction,1))
  }

  show(p:p5, shield:boolean) {
    p.push();
    p.fill(255);
    p.noStroke();
    p.translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading();
    p.rotate(this.angle);
    p.triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    p.triangle(-this.r / 2, -this.r, -this.r / 2, this.r, this.r / 4, 0);
    p.pop();
    //draw shield
    if (shield) {
      p.push();
      p.noFill();
      p.stroke(this.shieldColor);
      p.strokeWeight(this.shieldSize / 4);
      if (p.frameCount % 120 < 60) {
        this.shieldSize -= 0.15;
        this.shieldColor -= 2;
      } else {
        this.shieldSize += 0.15;
        this.shieldColor += 2;
      }
      p.translate(this.pos.x, this.pos.y);
      p.ellipse(0, 0, this.r * 5);
      p.pop();
    }
  }
}

export { Player };
