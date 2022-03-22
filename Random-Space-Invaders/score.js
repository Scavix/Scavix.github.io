class Score {
  constructor(x,y,score) {
    this.x=x;
    this.y=y;
    this.time = 150;
    this.score = score;
  }
  showMe() {
    if (--this.time > 0) {
      fill('yellow');
      textSize(20);
      text((this.score).toString(), this.x, this.y);
    }
  }
}
