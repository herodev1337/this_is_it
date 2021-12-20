import p5 from 'p5';
import {Active} from "../types"


class Frog{

  pos:p5.Vector;
  vel:p5.Vector;
  acc:p5.Vector;

  size:number;
  gravity:p5.Vector;

  constructor(p:p5,x:number,y:number,s:number){
    this.pos = p.createVector(x,y);
    this.vel = p.createVector(0,0);
    this.acc = p.createVector(0,0);
    this.size = s
    this.gravity = p.createVector(0,1)
  }
  create(p:p5,activate:Active,frogSprites:any){
    p.push()
    
    p.translate(this.pos.x,this.pos.y)
    if(activate.left){
      p.scale(-1,1)
    }
    else{
      p.scale(1,1)
    }
    p.imageMode(p.CENTER)
    p.noSmooth();
    if(p.frameCount % 120 < 60 && !activate.walk && !activate.jump){
      p.image(frogSprites[0],0,0,this.size,this.size)
      
    }
    else{
      p.image(frogSprites[0],0,0,this.size-this.size/10,this.size-this.size/40)
      
    }
    if(!activate.jump && activate.walk && p.frameCount % 30 < 15){
      p.image(frogSprites[0],0,0,this.size,this.size)
    }
    else if(!activate.jump && activate.walk && p.frameCount % 30 > 15){
       p.image(frogSprites[2],0,0,this.size,this.size)
    }
    if(activate.jump){
      
      p.image(frogSprites[1],0,0,this.size,this.size)
    }
    p.pop()
  }
  applyForce(force:p5.Vector){
    this.acc.add(force);
    
  }
  update(){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.set(0,0)
    this.applyForce(this.gravity);
    
    
  }
  hitBox(p:p5,activate:Active,object:boolean){
    
    if(object && this.pos.y < p.mouseY && this.pos.y > p.mouseY -this.size  && this.pos.x > p.mouseX - p.width/8 && this.pos.x < p.mouseX + p.width/8){//|| frog.pos.y > p.mouseY - frog.size && frog.pos.x < p.mouseX + p.width/4){
      this.vel.y *= 0;
      this.pos.y = p.mouseY - this.size
      activate.jump = false;
      
    }
    if(this.pos.y > p.height -this.size  && this.pos.x < p.width/2 - p.width/6 || this.pos.y > p.height - this.size && this.pos.x > p.width-p.width/3){
      this.vel.y *= 0;
      this.pos.y = p.height - this.size
      activate.jump = false;
      
    }
    
    else if( this.pos.y > p.height + this.size){
      this.pos.x = 0 + this.size
      this.pos.y = p.height - this.size*2
    }
    if (this.pos.x >= p.width - this.size) {
      this.pos.x = p.width - this.size;
      this.vel.x *= -1;
    }
    if (this.pos.x <= 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    }
  }
  move(p:p5,activate:Active){  
    if(p.keyIsDown(p.RIGHT_ARROW)){
      activate.walk = true;
      activate.left = false
     
      this.vel.x = 2
    }
    else if(p.keyIsDown(p.LEFT_ARROW)){
      activate.walk = true;
      activate.left = true;
     
      this.vel.x = -2;
    }
    else if(!activate.jump && !activate.walk){
      this.vel.set(0,0)
    }
    if( !activate.jump && !activate.walk && this.pos.y < p.height -this.size || !activate.jump && !activate.walk && this.pos.y > p.height -this.size){
      activate.jump = true;

    }
    if(activate.walk && !p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW)){
      activate.walk = false;
    }
    
  }
}
export { Frog};
// win animation ausbauen bei beiden games
