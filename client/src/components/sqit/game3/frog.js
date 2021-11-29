import p5 from 'p5';

class Frog{
  constructor(p,x,y,s){
    this.pos = p.createVector(x,y);
    this.vel = p.createVector(0,0);
    this.acc = p.createVector(0,0);
    this.size = s
    this.gravity = p.createVector(0,1)
    
    
    
    
    
  }
  create(p,activate,frogSprites){
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
  applyForce(force){
    this.acc.add(force);
    
  }
  update(){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.set(0,0)
    this.applyForce(this.gravity);
    
    
  }
  hitBox(p,activate,object){
    
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
  }
  move(p,activate){  
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
    if( !activate.jump && !activate.walk){
      this.acc.y +=4
    }
    // else if(!p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW) && !activate.jump){

    // }
    if(activate.walk && !p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW)){
      activate.walk = false;
    }
    
  }
}
export { Frog};
// Force adden, animations cleaner machen platform einbauen...