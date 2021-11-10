import p5 from 'p5';
class Shot {
    constructor(x, y,p) {
      this.pos = p.createVector(x,y);
      this.vel = p.createVector(player.angle,player.angle);
      this.length = 5;
      this.hit = false;
      this.angle = player.angle;
  }

  draw() {
    if (!this.hit) {
      p.stroke(255);
      p.strokeWeight(2);
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.angle);
      p.line(0,0,10,0);
      p.pop();
      if (this.pos.y < 0 || this.pos.y > height || this.pos.x < 0 || this.pos.x > width) {
        shots.splice(0, 1);
      }
    } 
  }

  move() {
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.mult(10); 
    this.pos.add(this.vel);
    for(let enemy of enemies){
      let shotDistance = p.dist(enemy.pos.x,enemy.pos.y,this.pos.x,this.pos.y)
      if(shotDistance < enemy.r && shield){
      enemies.splice(0,1);
      }
    }
    
  }
}