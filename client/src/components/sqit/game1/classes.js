class SlidingDoors {
  constructor(p,color) {
    this.col = color;
    this.push = 0;
    this.p = p
  }

  show() {
    this.p.fill(this.col);
    this.p.rect(-5 - this.push, 0, this.p.width / 2 + 5, this.p.height);

    this.p.fill(this.col);
    this.p.rect(this.p.width / 2 + this.push, 0, this.p.width / 2 + 5, this.p.height);
  }

  move(anim) {
    if (anim) {
      this.push = this.push < this.p.width / 2 ? this.push + 1 : this.p.width / 2;
    } else {
      if (this.push > 0) this.push--;
    }
  }
}

class BlinkLight {
  constructor(p, r, color, dir = -1) {
    this.x = 0;
    this.y = 0;
    this.r = r;
    this.col = color;
    this.dir = dir;
    this.push = 0;
    this.p = p
  }

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

  update(x,y) {
    this.x = x
    this.y = y
  }

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
