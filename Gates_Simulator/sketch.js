let gates = [],  selectedGate = null,  lines = [];


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (let gate of gates) {
    gate.display();
  }
  for (let line of lines) {
    line.display();
  }
}


function mouseClicked() {
  if(selectedGate==null){
    for (let i = gates.length - 1; i >= 0; i--) {
      if (gates[i].contains(mouseX, mouseY)) {
        selectedGate = gates[i];
        return;
      }
    }
  }else{
    for (let i = gates.length - 1; i >= 0; i--) {
      if (gates[i] !== selectedGate && gates[i].contains(mouseX, mouseY)) {
        lines.push(new Line(selectedGate, gates[i]));
        return;
      }
    }
  }
  gates.push(new LogicalGate(mouseX, mouseY, 80, 60, color(255, 200, 0), "AND"));
}

class Connection {
  constructor(startGate, endGate) {
    this.startGate = startGate;
    this.endGate = endGate;
  }

  display() {
    line(this.startGate.x + this.startGate.w / 2, this.startGate.y + this.startGate.h, this.endGate.x + this.endGate.w / 2, this.endGate.y);
  }
}

class LogicalGate {
  constructor(x, y, w, h, color, operation) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.operation = operation;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    fill(0);
    text(this.operation, this.x + this.w / 2, this.y + this.h / 2);
  }

  contains(px, py) {
    return px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h;
  }
}