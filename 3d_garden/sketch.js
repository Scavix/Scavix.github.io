let ms = [];
let m = 9;
let zoom = 1;
let cameraX = 0;
let cameraY = 0;
let zoomIncrement = 0.01;
let rotateIncremenet = 0.01;
let panSpeed = 5;
let cameraZ = -500;
let angleX = 0;
let angleY = 0;
let rotationSpeed = 0.02;

function preload() {
  for (let i = 0; i < sqrt(m); i++) {
    ms.push([]);
    for (let j = 0; j < sqrt(m); j++) {
      ms[i].push(loadModel("assets/Lowpoly_tree_sample.obj"));
    }
  }
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.parent("sketch-holder");
}

function draw() {
  background(200);
  rotateX(PI);
  translate(cameraX, cameraY, cameraZ);
  rotateX(angleX);
  rotateY(angleY);
  scale(zoom);
  push();
  fill('brown');
  stroke('black');
  translate(0, -20, 0);
  box(1000, 5, 1000);
  pop();
  for (let i = 0; i < sqrt(m); i++) {
    for (let j = 0; j < sqrt(m); j++) {
      push();
      ambientLight("green");
      translate(100 * j, -10, 100 * i);
      model(ms[i][j]);
      pop();
    }
  }
  if (keyIsDown(65)) {
    cameraX += panSpeed;
  }
  if (keyIsDown(68)) {
    cameraX -= panSpeed;
  }
  if (keyIsDown(87)) {
    zoom += panSpeed * zoomIncrement;
  }
  if (keyIsDown(83)) {
    zoom -= panSpeed * zoomIncrement;
  }
  if (keyIsDown(LEFT_ARROW)) {
    angleY += rotationSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    angleY -= rotationSpeed;
  }
  if (keyIsDown(UP_ARROW)) {
    //angleX -= rotationSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    //angleX += rotationSpeed;
  }
}

function mouseWheel(event) {
  zoom -= event.delta * zoomIncrement;
  zoom = constrain(zoom, 0.1, 5);
}

function mouseDragged() {
  cameraX += mouseX - pmouseX;
  cameraY -= mouseY - pmouseY;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}
