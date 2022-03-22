class Alien {
  constructor(level, img) {
    this.level = level;
    this.img = img;
    this.x = 51;
    this.y = this.level == 0 ? 150 : this.level == 1 ? 100 : 50;
    this.dir = 1;
    this.life = this.level == 0 ? 1 : this.level == 1 ? 2 : 3;
    this.speed = this.level == 0 ? 2 : this.level == 1 ? 4 : 6;
    this.size = 50;
    this.voto;
  }

  getScore() {
    return int(this.level == 0 ? 50 : this.level == 1 ? 200 : 800);
  }

  move() {
    if (this.x > 0 && this.x < width - 50) {
      this.x += this.speed * this.dir;
    } else {
      this.dir *= -1;
      this.x += this.speed * this.dir;
    }
    image(this.img, this.x, this.y, this.size, this.size);
  }
}
