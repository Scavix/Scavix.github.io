let cols = 10;
let rows = cols;
arr = [];
let size;
points = [];

function setup() {
  createCanvas(1000, 1000);
  size = height / rows;
  background(0);
  init();
}

function draw() {
  print("ok");
  append(points,arr[0][0].find_nearest());
  append(points,arr[0][0].find_fartest());
  for(let i = 1; i<points.length; i++){
    stroke(255);
    line((points[i-1].x+size/2),(points[i-1].y+size/2),(points[i].x+size/2),(points[i].y+size/2));
  }
}

function init(){
  for (let i = 0; i < cols; i++) {
    arr[i]=[];
    for (let j = 0; j < rows; j++) {
      (arr[i][j] = new Point(i*size,j*size,int(random(20)))).showMe();
    }
  }
  points = [];
  arr[0][0].isOn=1;
  arr[0][0].showMe();
  append(points,arr[0][0]);
}

function mousePressed() {
  init();
}
