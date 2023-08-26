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

function addPlane() {
  if(controller.coins >= document.getElementById("plane-cost").innerHTML){
    controller.coins -= document.getElementById("plane-cost").innerHTML;
    controller.planes.push(new Airplane("R" + str(controller.planes.length + 1), new Position(controller.cities[0].pos.x, controller.cities[0].pos.y), true, controller.cities[0], new Route(controller.getAirport(controller.cities[0].name), controller.getAirport(controller.cities[1].name)), 1, 0.05, 50));
    document.getElementById("plane-cost").innerHTML = parseInt(document.getElementById("plane-cost").innerHTML) * 2;
  }
  controller.planes.map(plane => plane.selected = false);
}

function upgradePlane(){
  for (let i = 0; i < controller.planes.length; i++) {
    if(controller.planes[i].selected){
      if(controller.coins >= document.getElementById("upgrade-cost").innerHTML){
        controller.coins -= document.getElementById("upgrade-cost").innerHTML;
        controller.planes[i].level++;
        document.getElementById("upgrade-cost").innerHTML = controller.planes[i].level * 100;
        controller.planes[i].passengers = controller.planes[i].level * 50;
        controller.planes.map(plane => plane.selected = false);
      }
      break;
    }
  }
}

function mouseClicked() {
  console.log("mouseClicked");
  for (let i = 0; i < controller.planes.length; i++) {
    if (dist(mouseX, mouseY, controller.planes[i].pos.x * width / 100, controller.planes[i].pos.y * height / 100) < 20) {
      controller.planes.map(plane => plane.selected = false);
      controller.planes[i].selected = true;
      document.getElementById("upgrade").disabled = false;
      document.getElementById("upgrade-cost").innerHTML = controller.planes[i].level * 100;
      document.getElementById("plane-name").innerHTML = "Plane: " + controller.planes[i].name;
      document.getElementById("plane-speed").innerHTML = "Speed: " + controller.planes[i].speed * controller.planes[i].level;
      document.getElementById("plane-level").innerHTML = "Level: " + controller.planes[i].level;
      document.getElementById("plane-capacity").innerHTML = "Capacity: " + controller.planes[i].passengers;
      return;
    }
  }
  document.getElementById("upgrade").disabled = true;
  document.getElementById("upgrade-cost").innerHTML = 0;
  document.getElementById("plane-name").innerHTML = "Plane: -";
      document.getElementById("plane-speed").innerHTML = "Speed: -";
      document.getElementById("plane-level").innerHTML = "Level: -";
      document.getElementById("plane-capacity").innerHTML = "Capacity: -";
      controller.planes.map(plane => plane.selected = false);
}

function updateSpeedMultiplier(){
  controller.speedMultiplier = document.getElementById("speed-slider").value;
}