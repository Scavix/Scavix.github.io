let angle = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1);
}

function draw() {
  background(255, 5, 100);
  stroke(255);
  translate(width/2, height*4/5);
  branch(PI*50);
}

function branch(len) {
  angle+=0.00002;
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len >= PI) {
    push();
    rotate(-angle);
    branch(len * QUARTER_PI);
    pop();
    push();
    rotate(+angle);
    branch(len * 0.5*QUARTER_PI);
    pop();
  }
}