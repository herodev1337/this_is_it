import p5 from 'p5';
class Player {
  constructor(x, y, s,p) {
    this.pos = p.createVector(x, y);
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0,0);
    this.size = s;
    this.r = p.sqrt(this.size) * 10;
    this.angle = 0;
    this.shieldSize = this.r;
    this.shieldColor = 100;
  }
  edges() {
    if (this.pos.y >= p.height - this.r) {
      this.pos.y = p.height - this.r;
      this.vel.y *= -1;
    }
    else if (this.pos.y <= this.r) {
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
  fire() {
      shots.push(new Shot(this.pos.x, this.pos.y));
  }
  attract(enemy){
	let force = p5.Vector.sub(this.pos, enemy.pos);
	let distanceSq = force.magSq();
	let G = 0.005;
	let strength = 0.2;
	force.setMag(strength);
	enemy.applyForce(force);
}
  update() {
    
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.mult(2);
    if (p.keyIsDown(UP_ARROW)){
    this.vel.mult(3);  
    }
    this.pos.add(this.vel);
    for(let enemy of enemies){
      let playerDistance = dist(enemy.pos.x,enemy.pos.y,player.pos.x,player.pos.y);
    if(playerDistance < enemy.r + player.r/2 && !shield){
      reset();
    }
    }
    
  }

  show() {
    p.push();
    p.fill(255);
    p.noStroke();
    p.translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading();
    p.rotate(this.angle);
    p.triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    p.triangle(-this.r/2,-this.r,-this.r/2,this.r,this.r/4,0);
    p.pop();
    //draw shield
    if(shield){
      p.push();
      p.noFill();
      p.stroke(this.shieldColor);
      p.strokeWeight(this.shieldSize/4);
      if(p.frameCount % 120  < 60){
        this.shieldSize -= 0.15;
        this.shieldColor -= 2;
      }
      else{
        this.shieldSize += 0.15;
        this.shieldColor += 2;
      }
      p.translate(this.pos.x, this.pos.y);
      p.ellipse(0,0,this.r*5)
      p.pop();
    }
  }
}

function reset(){
  shots =[];
  enemies = [];
  frameCount = 0;
  starColor = 255;
  player.pos.x=p.width/2;
  player.pos.y=p.height/2;
  print('You Lose !')
}

