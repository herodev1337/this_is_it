import p5 from "p5";

import {Vec3} from "../types";


class SlidingDoors {
  /**
   * A class representing a 2 rectangles, sliding apart from each other when activated.
   * 
   * 
   * @param {Object} p P5 Instance
   * @param {number[]} color List of numbers representing a rgb color
   */
  
  col:string;
  push:number;
  p:p5;

  constructor(p:p5,color:string) {
    this.col = color;
    this.push = 0;
    this.p = p
  }

  /**
   * Show the rectangles.
   */
  show() {
    this.p.fill(this.col);
    this.p.rect(-5 - this.push, 0, this.p.width / 2 + 5, this.p.height);

    this.p.fill(this.col);
    this.p.rect(this.p.width / 2 + this.push, 0, this.p.width / 2 + 5, this.p.height);
  }

  /**
   * Animate the sliding rectangles.
   * 
   * @param {boolean} anim Boolean value that activated the animation.
   */
  move(anim:boolean) {
    if (anim) {
      this.push = this.push < this.p.width / 2 ? this.push + 1 : this.p.width / 2;
    } else {
      if (this.push > 0) this.push--;
    }
  }
}

class BlinkLight {
  /**
   * A class representing 2 circles that light up back and forth.
   * 
   * @param {object} p P5 instance
   * @param {number} r Radius of the circles
   * @param {number[]} color List of number representing a rgb color
   * @param {number} dir Number representing the direction in which the blur should be applied
   */

  x:number;
  y:number;
  r:number;
  col:Vec3;
  dir:number;
  push:number;
  p:p5;


  constructor(p:p5, r:number, color:Vec3, dir:number = -1) {
    this.x = 0;
    this.y = 0;
    this.r = r;
    this.col = color;
    this.dir = dir;
    this.push = 0;
    this.p = p
  }

  /**
   * Show the circles by drawing them many times which scaled down to get a blur effect on the edges.
   */
  show() {
    // this.update(p)
    this.p.noStroke();
    for (let i = 0; i < this.r; i++) {
      this.p.fill(...this.col, i);
      this.p.circle(this.x - this.push * this.dir, this.y, this.r * 2 - i);
    }
    // fill(this.col);
    // circle(this.x - this.push * this.dir, this.y, this.r * 2);
  }

  /**
   * 
   * @param {number} x Updated X value 
   * @param {number} y Updated Y value
   */
  update(x:number,y:number) {
    this.x = x
    this.y = y
  }

  /**
   * Increment the a push variable which slides the circles apart from each other.
   */
  move() {
    this.push++;
  }

  isClicked() {
    if (this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y) < this.r) return true;
    return false;
  }

  isPressed() {
    if (this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y) < this.r && this.p.mouseIsPressed)
      return true;
    return false;
  }
}

export { SlidingDoors, BlinkLight };
