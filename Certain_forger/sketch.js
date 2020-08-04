let weight = 1920;
let height = 1080;
let prev = 0;
function setup() {
  createCanvas(weight, height);
  background(220);
  frameRate(10);
  
}

function draw(){
  let r = random(10+frameCount*sqrt(2));
  push();
  translate(prev,prev);
  circle(weight/2,height/2,r);
  pop();
  push();
  translate(-prev,-prev);
  circle(weight/2,height/2,r);
  pop();
  push();
  translate(prev,-prev);
  circle(weight/2,height/2,r);
  pop();
  push();
  translate(-prev,+prev);
  circle(weight/2,height/2,r);
  pop();
  prev = r;
}