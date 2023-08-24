let img;
let data;
let controller;
let imgs = [];

function preload() {
  img = loadImage('assets/world.svg');
  data = loadJSON('assets/data.json');
  for (let i = 0; i < 4; i++) {
    imgs.push(loadImage('assets/' + str(i+1) + '.png'));
  }
}

function setup() {
  let cnv = createCanvas(windowWidth*.95, windowWidth / 2.3);
  cnv.parent('sketch-holder');
  controller = new Controller(img,imgs,'#ADD8E6');
  controller.planes.push(new Airplane("R18",new Position(controller.cities[0].pos.x,controller.cities[0].pos.y),true,controller.cities[0],new Route(controller.getAirport(controller.cities[0].name),controller.getAirport(controller.cities[1].name)),1));
  controller.planes.push(new Airplane("R19",new Position(controller.cities[0].pos.x,controller.cities[0].pos.y),true,controller.cities[0],new Route(controller.getAirport(controller.cities[0].name),controller.getAirport(controller.cities[2].name)),2));
  controller.planes.push(new Airplane("R20",new Position(controller.cities[1].pos.x,controller.cities[1].pos.y),true,controller.cities[1],new Route(controller.getAirport(controller.cities[1].name),controller.getAirport(controller.cities[3].name)),3));
}

function draw() {
  controller.draw();
  controller.move();
}

function windowResized() {
  resizeCanvas(windowWidth*.95, windowWidth / 2.3);
}
