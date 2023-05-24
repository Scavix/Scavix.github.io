let grid = [],
  selectedBulb = null,
  lines = [],
  gridSize = 8,
  bulbOnImg,
  bulbOffImg,
  energyImg,
  sizes;

function preload() {
  bulbOnImg = loadImage("bulbOn.png");
  bulbOffImg = loadImage("bulbOff.png");
  energyImg = loadImage("energy.png");
}

function setup() {
  createCanvas(
    windowWidth < windowHeight ? windowWidth : windowHeight,
    windowWidth < windowHeight ? windowWidth : windowHeight
  );
  sizes = height / gridSize / 2;
  for (let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      grid[i].push(new Bulb(i, j, ""));
    }
  }
  grid[0][0] = new Energy(0, 0);
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
  if (grid[x][y].state == "") {
    grid[x][y] = new Bulb(x, y, "off");
    selectedBulb = null;
    return;
  }
  if (selectedBulb == null) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (
          (grid[i][j].x * width) / gridSize <= mouseX &&
          (grid[i][j].x * width) / gridSize + width / gridSize >= mouseX &&
          (grid[i][j].y * height) / gridSize <= mouseY &&
          (grid[i][j].y * height) / gridSize + height / gridSize >= mouseY
        ) {
          selectedBulb = grid[i][j];
          return;
        }
      }
    }
  } else {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (
          grid[i][j] !== selectedBulb &&
          (grid[i][j].x * width) / gridSize <= mouseX &&
          (grid[i][j].x * width) / gridSize + width / gridSize >= mouseX &&
          (grid[i][j].y * height) / gridSize <= mouseY &&
          (grid[i][j].y * height) / gridSize + height / gridSize >= mouseY
        ) {
          lines.push(new Connection(selectedBulb, grid[i][j]));
          selectedBulb = null;
          checkConnected();
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
    line(
      (this.startGate.x * width) / gridSize + width / gridSize / 2,
      (this.startGate.y * height) / gridSize + height / gridSize / 2,
      (this.endGate.x * width) / gridSize + width / gridSize / 2,
      (this.endGate.y * height) / gridSize + height / gridSize / 2
    );
  }
}

class Bulb {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
  }

  display() {
    if (this.state == "") {
      return;
    } else if (this.state == "off") {
      image(
        bulbOffImg,
        (this.x * width) / gridSize + width / gridSize / 4 ,
        (this.y * height) / gridSize + height / gridSize / 4,
        sizes,
        sizes
      );
    } else {
      image(
        bulbOnImg,
        (this.x * width) / gridSize + width / gridSize / 4 ,
        (this.y * height) / gridSize + height / gridSize / 4,
        sizes,
        sizes
      );
    }
  }
}

/*function keyPressed() {
  if (keyCode <= 51 && keyCode >= 49) {
    gateType = gateTypes[keyCode - 49];
  }
}*/

function showGrid() {
  for (let i = 0; i < gridSize; i++) {
    line((i * width) / gridSize, 0, (i * width) / gridSize, height);
    line(0, (i * height) / gridSize, width, (i * height) / gridSize);
  }
}

class Energy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    image(
      energyImg,
      (this.x * width) / gridSize + width / gridSize / 4 ,
      (this.y * height) / gridSize + height / gridSize / 4,
      sizes,
      sizes
    );
  }
}


function checkConnected(){
  for(let i = 0; i < lines.length; i++){
    if(lines.startGate == grid[0][0]){
      lines.endGate.state = "on";
    }
    if(lines.endGate == grid[0][0]){
      lines.startGate.state = "on";
    }
  }
}