let img;
let data;
let controller;

function preload() {
  img = loadImage('./world.svg');
  data = loadJSON('./data.json');
}

function setup() {
  let cnv = createCanvas(windowWidth*.95, windowWidth / 2.3);
  cnv.parent('sketch-holder');
  controller = new Controller(img);
  console.log(data);
}

function draw() {
  background('#ADD8E6');
  controller.draw();
  //controller.move();
}

function windowResized() {
  resizeCanvas(windowWidth*.95, windowWidth / 2.3);
}
