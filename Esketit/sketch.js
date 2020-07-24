let angolo = 0;

function setup() {
  createCanvas(900, 480, WEBGL);
  frameRate(60);
  noStroke();
}

function draw() {
  background(255, 5, 100);
  ortho(-width/2, width/2, -height/2, height/2);
  branch(PI*PI*PI*PI);
}

function branch(len) {
  angolo+=0.00005;
  directionalLight(50, 250, 250, -1, 0, -1);
  translate(-len, -len, -len);
  normalMaterial();
  rotateX(len);
  rotateY(len);
  sphere(-len);
  if (len >= PI/2) {
    push();
    rotate(-angolo);
    branch(len * QUARTER_PI);
    pop();
    push();
    rotate(+angolo);
    branch(len * 0.5*QUARTER_PI);
    pop();
  }
}