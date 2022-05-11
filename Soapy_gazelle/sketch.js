let network;

function setup() {
  createCanvas(600, 360);
  network = new Network(width / 2, height / 2);

  let layers = 4;
  let inputs = 3;

  let outputNeuron = new Neuron(275, 0);
  let inputNeuron = new Neuron(-275, 0);
  for (let i = 0; i < layers; i++) {
    for (let j = 0; j < inputs; j++) {
      let x = map(i, 0, layers, -200, 350);
      let y = map(j, 0, inputs - 1, -75, 75);
      let n = new Neuron(x, y);
      if (i > 0) {
        for (let k = 0; k < inputs; k++) {
          let prev = network.neurons[network.neurons.length - inputs + k - j];
          network.connect(prev, n, random(0.7));
        }
      }
      if (i == layers - 1) {
        network.connect(n, outputNeuron, random(0.7));
      }
      network.addNeuron(n);
    }
    if (i == 0) {
      for (let k = 0; k < inputs; k++) {
        network.connect(inputNeuron, network.neurons[k], random(0.7));
      }
    }
  }
  network.addNeuron(outputNeuron);
  network.addNeuron(inputNeuron);
}

function draw() {
  background(255);
  network.update();
  network.display();

  if (frameCount % 30 == 0) {
    network.feedforward(random(1));
  }
}