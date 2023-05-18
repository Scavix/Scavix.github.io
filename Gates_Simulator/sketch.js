let grid = [],
  selectedGate = null,
  lines = [], gridSize = 8,
  gateTypes = ["NOT", "AND", "OR", "NAND", "NOR", "XOR", "XNOR"],
  gateType = "AND",
  gatesHeight, gatesWidth;

function setup() {
  createCanvas(
    windowWidth < windowHeight ? windowWidth : windowHeight,
    windowWidth < windowHeight ? windowWidth : windowHeight
  );
  gatesHeight = height / gridSize / 2;
  gatesWidth = width / gridSize / 4 * 3;
  for (let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      grid[i].push(new LogicalGate(i, j, ""));
    }
  }
}

function draw() {
  background(220);
  for (let line of lines) {
    line.display();
  }
  for (let gateArray of grid) {
    for (let gate of gateArray) {
      gate.display();
    }
  }
  showGrid();
}


function mouseClicked() {
  let x = Math.floor(mouseX / (width / gridSize));
  let y = Math.floor(mouseY / (height / gridSize));
  if (grid[x][y].operation == "") {
    grid[x][y] = new LogicalGate(x, y, gateType);
    selectedGate = null;
    return;
  }
  if (selectedGate == null) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (
          grid[i][j].x * width / gridSize <= mouseX &&
          grid[i][j].x * width / gridSize + width / gridSize >= mouseX &&
          grid[i][j].y * height / gridSize <= mouseY &&
          grid[i][j].y * height / gridSize + height / gridSize >= mouseY
        ) {
          selectedGate = grid[i][j];
          return;
        }
      }
    }
  } else {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (
          grid[i][j] !== selectedGate &&
          grid[i][j].x * width / gridSize <= mouseX &&
          grid[i][j].x * width / gridSize + width / gridSize >= mouseX &&
          grid[i][j].y * height / gridSize <= mouseY &&
          grid[i][j].y * height / gridSize + height / gridSize >= mouseY
        ) {
          lines.push(new Connection(selectedGate, grid[i][j]));
          selectedGate = null;
          return;
        }
      }
    }
  }
}

class Connection {
  constructor(startGate, endGate) {
    this.startGate = startGate;
    this.endGate = endGate;
  }

  display() {
    console.log();
    line(this.startGate.x * width / gridSize + width / gridSize / 2, this.startGate.y * height / gridSize  + height / gridSize / 2 , this.endGate.x * width / gridSize + width / gridSize / 2, this.endGate.y * height / gridSize + height / gridSize / 2);
  }
}

class LogicalGate {
  constructor(x, y, operation) {
    this.x = x;
    this.y = y;
    this.color = operation == "AND" ? "yellow" : operation == "OR" ? "green" : operation == "NOT" ? "red" : operation == "NAND" ? "orange" : operation == "NOR" ? "blue" : operation == "XOR" ? "purple" : "pink";
    this.operation = operation;
  }

  display() {
    if (this.operation == "") {
      return;
    }
    fill(this.color);
    rect(this.x * width / gridSize + width / gridSize / 4 / 2, this.y * height / gridSize + height / gridSize / 4, gatesWidth, gatesHeight);
    textAlign(CENTER, CENTER);
    fill(0);
    text(this.operation, this.x * width / gridSize + gatesWidth / 2 + width / gridSize / 4 / 2, this.y * height / gridSize + gatesHeight / 2 + height / gridSize / 4);
  }
}

function keyPressed() {
  if (keyCode <= 51 && keyCode >= 49) {
    gateType = gateTypes[keyCode - 49];
  }
}


function showGrid() {
  for (let i = 0; i < gridSize; i++) {
    line(i * width / gridSize, 0, i * width / gridSize, height);
    line(0, i * height / gridSize, width, i * height / gridSize);
  }
}