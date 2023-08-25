let img;
let data;
let controller;
let imgs = [];
let city;

function preload() {
  img = loadImage('assets/world.svg');
  city = loadImage('assets/city.png');
  data = loadJSON('assets/data.json');
  for (let i = 0; i < 4; i++) {
    imgs.push(loadImage('assets/' + str(i + 1) + '.png'));
  }
}

function setup() {
  let cnv = createCanvas(windowWidth * .95, windowWidth / 2.3);
  cnv.parent('sketch-holder');
  controller = new Controller(img, imgs, city, '#ADD8E6');
  controller.planes.push(new Airplane("R18", new Position(controller.cities[0].pos.x, controller.cities[0].pos.y), true, controller.cities[0], new Route(controller.getAirport(controller.cities[0].name), controller.getAirport(controller.cities[1].name)), 1, 0.05, 50));
  controller.planes.push(new Airplane("R19", new Position(controller.cities[0].pos.x, controller.cities[0].pos.y), true, controller.cities[0], new Route(controller.getAirport(controller.cities[0].name), controller.getAirport(controller.cities[2].name)), 2, 0.05, 50));
  controller.planes.push(new Airplane("R20", new Position(controller.cities[1].pos.x, controller.cities[1].pos.y), true, controller.cities[1], new Route(controller.getAirport(controller.cities[1].name), controller.getAirport(controller.cities[3].name)), 3, 0.05, 50));
}

function draw() {
  controller.draw();
  controller.move();
}

function windowResized() {
  resizeCanvas(windowWidth * .95, windowWidth / 2.3);
}

/*function mouseClicked() {
  console.log("mouseClicked");
  for (let i = 0; i < controller.cities.length; i++) {
    if (dist(mouseX, mouseY, controller.city[i].pos.x * width / 100, controller.city[i].pos.y * height / 100) < 10) {
      controller.isDragging = true;
      controller.draggedFrom = controller.city[i];
      controller.mouseStart.set(mouseX, mouseY);
      console.log("ok");
      break;
    }
  }
}

function mouseDragged() {
  if (controller.isDragging && controller.draggedFrom) {
    controller.draggedFrom.pos.x += (mouseX - controller.mouseStart.x) / (width / 100);
    controller.draggedFrom.pos.y += (mouseY - controller.mouseStart.y) / (height / 100);
    controller.mouseStart.set(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let i = 0; i < controller.cities.length; i++) {
    if (dist(mouseX, mouseY, controller.city[i].pos.x * width / 100, controller.city[i].pos.y * height / 100) < 10) {
      controller.isDragging = true;
      controller.draggedTo = controller.city[i];
      controller.mouseStart.set(mouseX, mouseY);
      break;
    }
  }
  controller.isDragging = false;
}*/