class Neuron {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.connections = [];
    this.sum = 0;
    this.r = 32;
  }

  display() {
    stroke(0);
    strokeWeight(1);
    let b = map(this.sum, 0, 1, 255, 0);
    fill(b);
    ellipse(this.location.x, this.location.y, this.r, this.r);
    this.r = lerp(this.r, 32, 0.1);
  }

  addConnection(c) {
    this.connections.push(c);
  }

  feedforward(input) {
    this.sum += input;
    if (this.sum > 1) {
      this.fire();
      this.sum = 0;
    }
  }

  fire() {
    this.r = 64;
    for (let i = 0; i < this.connections.length; i++) {
      this.connections[i].feedforward(this.sum);
    }
  }
}