class Projectile {
  constructor(x, y, speed, damage, size, myColor) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.size = size;
    this.myColor = myColor;
  }

  move() {
    this.y -= this.speed;
    fill(this.myColor);
    circle(this.x, this.y, this.size);
  }
}
