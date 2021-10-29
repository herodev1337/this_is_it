class SlidingDoors {
  constructor(color) {
    this.col = color;
    this.push = 0;
  }

  show() {
    fill(this.col);
    rect(-5 - this.push, 0, width / 2 + 5, height);

    fill(this.col);
    rect(width / 2 + this.push, 0, width / 2 + 5, height);
  }

  move(anim) {
    if (anim) {
      this.push = this.push < width / 2 ? this.push + 1 : width / 2;
    } else {
      if (this.push > 0) this.push--;
    }
  }
}

class BlinkLight {
  constructor(x, y, r, color, dir = -1) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color;
    this.dir = dir;
    this.push = 0;
  }

  show() {
    noStroke();
    fill(this.col);
    circle(this.x - this.push * this.dir, this.y, this.r * 2);
  }

  move() {
    this.push++;
  }

  isClicked() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) return true;
    return false;
  }

  isPressed() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r && mouseIsPressed)
      return true;
    return false;
  }
}

export { SlidingDoors, BlinkLight };
