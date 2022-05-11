let myController, data, italy;

function setup() {
  createCanvas(400, 400);
  myController = new Controller();
  myController.planes.push(new Airplane('A2',new Position(6,9),true,'Agrigento',new Route(myController.getAirport('Agrigento'),myController.getAirport('Bari')),new Model('a')));
  myController.planes.push(new Airplane('B2',new Position(3,7),true,'Cagliari',new Route(myController.getAirport('Cagliari'),myController.getAirport('Bergamo')),new Model('b')));
  myController.planes.push(new Airplane('C2',new Position(4,3),true,'Bologna',new Route(myController.getAirport('Bologna'),myController.getAirport('Rome')),new Model('c')));
}

function preload() {
  data = loadJSON('./data.json');
  italy = loadImage('./italy.jpg');
}

function draw() {
  myController.draw();
  myController.move();
}
