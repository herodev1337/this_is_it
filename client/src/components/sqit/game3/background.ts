import p5 from 'p5';
import * as cls1 from './frog';


class Background {
  constructor(){}
  
  draw(p:p5,frog:cls1.Frog,backgroundsheet:any,bgSprites:any){
    p.image(backgroundsheet,0,0,p.width/3,p.height)
    p.image(backgroundsheet,p.width/3,0,p.width/3,p.height)
    p.image(backgroundsheet,(p.width/3)*2,0,p.width/3,p.height)      
    p.image(bgSprites[0],-p.width/6,p.height-frog.size ,p.width/2,frog.size*2)
    p.image(bgSprites[3],-100,p.height - (((p.width+p.height)/4.9)+frog.size/2),((p.width+p.height)/4),((p.width+p.height)/5))
    p.image(bgSprites[0],p.width-p.width/3,p.height-frog.size ,p.width/2,frog.size*2)
    p.image(bgSprites[4],p.width/4,p.height - (frog.size+frog.size/2),frog.size,frog.size)

  }
}

export {Background};