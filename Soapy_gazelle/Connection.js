class Connection {
  constructor(from, to, w) {
    this.weight = w;
    this.a = from;
    this.b = to;
    this.sending = false;
    this.sender = null;
    this.output = 0;
  }

  display() {
    stroke(0);
    strokeWeight(1 + this.weight * 4);
    line(this.a.location.x, this.a.location.y, this.b.location.x, this.b.location.y);
    if (this.sending) {
      fill(0);
      strokeWeight(1);
      ellipse(this.sender.x, this.sender.y, 16, 16);
    }
  }

  feedforward(val) {
    this.sending = true;
    this.sender = createVector(this.a.location.x, this.a.location.y);
    this.output = val * this.weight;
  }

  update() {
    if (this.sending) {
      this.sender.x = lerp(this.sender.x, this.b.location.x, 0.1);
      this.sender.y = lerp(this.sender.y, this.b.location.y, 0.1);
      let distAB = dist(this.sender.x, this.sender.y, this.b.location.x, this.b.location.y);
      if (distAB < 1) {
        this.b.feedforward(this.output);
        this.sending = false;
      }
    }
  }
}