class Platform {
  constructor(size, img) {
    this.img = img;
    this.size = size;
    this.len = width / this.size;
    this.x = width / 2;
    this.color = color;
    this.step = width / 40;
    this.yScaling = height / 10;
    this.y = height - this.yScaling;
  }

  update() {
    if (mouseX > this.x && this.x + this.len / 2 < width) {
      if (this.x + this.step > mouseX) {
        this.x = mouseX;
      } else {
        this.x += this.step;
      }
    } else if (mouseX < this.x && this.x - this.len / 2 > 0) {
      if (this.x - this.step < mouseX) {
        this.x = mouseX;
      } else {
        this.x -= this.step;
      }
    }
  }

  drawMe() {
    this.update();
    image(
      this.img,
      this.x - this.len / 2,
      this.y - this.len / 2,
      this.len,
      this.len
    );
  }

  hit(x, y, s) {
    tmp = second();
    if (planet.lastHit != tmp) {
      if (
        dist(this.x, this.y, x, y) <
        s / 2 + this.len / 2
      ) {
        planet.dirY *= -1;
        planet.dirX *= -1;
        planet.lastHit = tmp;
      }
    }
  }
}
