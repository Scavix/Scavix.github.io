class Walls {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.d = w / 200;
    this.loseSentinel = true;
  }

  drawAll() {
    fill("blue");
    noStroke();
    rect(0, 0, this.w, this.d);
    rect(0, 0, this.d, this.h);
    rect(this.w - this.d, 0, this.w, this.h);
  }

  hit(x, y, s) {
    if (x + s / 2 >= this.w) {
      planet.dirX *= -1;
      console.log("Hit dx wall");
    } else if (x - s / 2 <= 0) {
      planet.dirX *= -1;
      console.log("Hit sx wall");
    } else if (y - s / 2 <= 0) {
      planet.dirY *= -1;
      console.log("Hit top wall");
    } else if (y - s >= this.h) {
      if (this.loseSentinel) {
        console.log("Game over");
        this.loseSentinel = false;
        planet.moveSentinel = false;
      }
    }
  }
}
