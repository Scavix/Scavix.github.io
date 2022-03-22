class Ship {
  constructor(img) {
    this.pointX = 250;
    this.pointY = 450;
    this.dx = 0;
    this.dy = 0;
    this.x = 250;
    this.y = 450;
    this.xscaling = 0.75;
    this.yscaling = 0.9;
    this.slow = 0.05;
    this.score = 0;
    this.img = img;
    this.projectileSpeed = 5;
    this.projectileDamage = 1;
    this.projectileSize = 25;
    this.projectileColor = 'white';
    this.sec = second();
  }

  move() {
    this.pointX = mouseX;
    this.pointY = mouseY > height / 2 ? mouseY : this.pointY;
    this.dx = this.pointX - this.x;
    this.dy = this.pointY - this.y;
    if(this.x + this.dx * this.slow < width){
      this.x += this.dx * this.slow;
    }
    if(this.y + this.dy * this.slow < height){
      this.y += this.dy * this.slow;
    }
    tmp = second();

    if (tmp != this.sec) {
      this.sec = tmp;
      shoot(
        this.x,
        this.y - (100 * this.yscaling) / 2,
        this.projectileSpeed,
        this.projectileDamage,
        this.projectileSize,
        this.projectileColor
      );
    }

    image(
      this.img,
      this.x - (100 * this.xscaling) / 2,
      this.y - (100 * this.yscaling) / 2,
      100 * this.xscaling,
      100 * this.yscaling
    );
  }
}
