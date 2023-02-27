let progress = 0;
let workers = [];
function preload() {
  //fruits = loadJSON("fruits.json");
}

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  for(i=1;i<=4;i++){
    workers.push(new Worker(i*2-1));
  }
}

function draw() {
  background(220);
  for(i=0;i<workers.length;i++){
    workers[i].work();
    workers[i].show();
  }
}

class Worker {
  constructor(id) {
    this.id = id;
    this.progress = 0;
  }
  work() {
    this.progress = this.progress + 1;
    if (this.progress > width - 150) {
      this.progress = 0;
    }
  }
  show() {
    fill("green");
    noStroke();
    rect(50, 50*this.id, 50+this.progress, 50);
  }
}