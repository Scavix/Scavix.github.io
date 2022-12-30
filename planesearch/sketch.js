let myController, data, italy;

function setup() {
  createCanvas(400, 400);
  myController = new Controller();
  myController.planes.push(new Airplane('A2',new Position(5.5,8),true,'Greece',new Route(myController.getAirport('Greece'),myController.getAirport('Romania')),new Model('a')));
  myController.planes.push(new Airplane('B2',new Position(1.5,2.5),true,'Iceland',new Route(myController.getAirport('Iceland'),myController.getAirport('Finland')),new Model('b')));
  myController.planes.push(new Airplane('C2',new Position(5,5.5),true,'Poland',new Route(myController.getAirport('Poland'),myController.getAirport('Belarus')),new Model('c')));
  myController.findRoute("Norway","Finland");
}

function preload() {
  data = loadJSON('./data.json');
  italy = loadImage('./europe.png');
}

function draw() {
  myController.draw();
  myController.move();
}