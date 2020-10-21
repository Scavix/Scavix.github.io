let cols = 100;
let rows = cols;
arr = [];
let size;
points = [];

function setup() {
  createCanvas(1000, 1000);
  size = height / rows;
  background(0);
  init();
  aggiungi();
}

function draw() {
  /*print("ok");
  append(points,arr[0][0].find_nearest());
  append(points,arr[0][0].find_fartest());
  for(let i = 1; i<points.length; i++){
    stroke(255);
    line((points[i-1].x+size/2),(points[i-1].y+size/2),(points[i].x+size/2),(points[i].y+size/2));
  }*/
  //Disegna a 2 a 2;
  for(let i = 0; i < points.length; i++){
    line(((points[i].getX())*size+size/2),((points[i].getY())*size+size/2),
	(((points[i].find_nearest()).getX())*size+size/2),(((points[i].find_nearest()).getY())*size+size/2));
  }
}

function init(){
  for (let i = 0; i < cols; i++) {arr[i]=[];}
  for (let i = 0; i < cols; i++) {for (let j = 0; j < rows; j++) {arr[i][j]=0;}}
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      (arr[i][j] = new Point(i,j,int(random(100)))).showMe();
    }
  }
  points = [];
  arr[0][0].isOn=1;
  points[0]=arr[0][0];
}

function mousePressed() {
  init();
  aggiungi();
}

function aggiungi(){
  for (let i = 0; i < cols; i++) {
    for (let j = 1; j < rows; j++) {
      if(arr[i][j].isOn==1){append(points, arr[i][j]);}

    }
  }
}
