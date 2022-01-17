let x = 0;
let y = 0;
let slow = 0.05;
let img;
function preload() {
  img = loadImage("photo.jpg");
}
function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(0);
  let pointX = mouseX;
  let pointY = mouseY;
  let dx = pointX - x;
  let dy = pointY - y;
  x += dx * slow;
  y += dy * slow;
  image(img, x, y,100,100);
}