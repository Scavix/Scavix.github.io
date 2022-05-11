class Network {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.neurons = [];
    this.connections = [];
  }

  addNeuron(n) {
    this.neurons.push(n);
  }

  display() {
    push();
    translate(this.location.x, this.location.y);
    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i].display();
    }
    for (let i = 0; i < this.connections.length; i++) {
      this.connections[i].display();
    }
    pop();
  }

  connect(a, b, weight) {
    let c = new Connection(a, b, weight);
    a.addConnection(c);
    this.connections.push(c);
  }

  feedforward(input) {
    let start = this.neurons[this.neurons.length - 1];
    start.feedforward(input);
  }

  update() {
    for (let i = 0; i < this.connections.length; i++) {
      this.connections[i].update();
    }
  }
}