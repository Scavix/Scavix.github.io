class Planet {
  constructor(x, y, speedX, speedY, damage, size, img) {
    this.x = x + size / 2;
    this.y = y + size / 2;
    this.speedX = speedX;
    this.speedY = speedY;
    this.damage = damage;
    this.size = size;
    this.img = img;
    this.dirX = +1;
    this.dirY = -1;
    this.moveSentinel = true;
    this.lastHit = 0;
  }

  move() {
    if (this.moveSentinel) {
      this.x += this.speedX * this.dirX;
      this.y += this.speedY * this.dirY;
      image(
        this.img,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    }
  }
}
