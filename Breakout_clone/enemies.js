class Enemies {
  constructor(num, img) {
    this.arr = [];
    this.num = num;
    this.len = width / this.num;
    for (i = 0; i < this.num; i++) {
      this.arr[i] = [];
      for (j = 0; j < this.num / 2; j++) {
        this.arr[i][j] = new Enemy(
          (i * width) / this.num + this.len / 2,
          (j * width) / this.num + this.len / 2,
          this.len,
          true,
          img
        );
      }
    }
  }

  drawAll() {
    for (i = 0; i < this.num; i++) {
      for (j = 0; j < this.num / 2; j++) {
        this.arr[i][j].drawMe();
      }
    }
  }

  hit(x, y, s) {
    for (i = 0; i < this.num; i++) {
      for (j = 0; j < this.num / 2; j++) {
        if (
          dist(this.arr[i][j].x, this.arr[i][j].y, x, y) <
            s / 2 + this.len / 2 &&
          this.arr[i][j].getVal()
        ) {
          planet.dirY *= -1;
          this.arr[i][j].setVal(false);
        }
      }
    }
  }

  checkWin() {
    for (i = 0; i < this.num; i++) {
      for (j = 0; j < this.num / 2; j++) {
        if(this.arr[i][j].val==true){
          return;
        }
      }
    }
    console.log('Win');
  }
}
