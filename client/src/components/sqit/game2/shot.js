import p5 from 'p5';
class Shot {
    constructor(x, y,p,angle) {
      this.pos = p.createVector(x,y);
      this.vel = p.createVector(angle,angle);
      this.length = 5;
      this.hit = false;
      this.angle = angle;
      this.p = p
  }

  draw(shots) {
    if (!this.hit) {
      this.p.stroke(255);
      this.p.strokeWeight(2);
      this.p.push();
      this.p.translate(this.pos.x, this.pos.y);
      this.p.rotate(this.angle);
      this.p.line(0,0,10,0);
      this.p.pop();
      if (this.pos.y < 0 || this.pos.y > this.p.height || this.pos.x < 0 || this.pos.x > this.p.width) {
        shots.splice(0, 1);
      }
    } 
  }

  move(enemies, shield, enemy) {
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.mult(10); 
    this.pos.add(this.vel);
    for (let i =0; i < enemies.length; i++){
      let shotDistance = this.p.dist(enemies[i].pos.x,enemies[i].pos.y,this.pos.x,this.pos.y)
      if(shotDistance < enemy.r && shield){
      enemies.splice(i,1);
      }
    }
    
  }
}
export {Shot}