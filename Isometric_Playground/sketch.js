let player;
let ground;
let wall;
let x = 89; y = 0, z = 150;
let sliderX, sliderY, sliderZ;

function setup() {
  let cnv = createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);
  cnv.parent('sketch-holder');
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  camera(0, 0, (height / 4 * 3) / tan(PI / 6), 0, 0, 0, 0, 1, 0)
  player = new Player();
  ground = new Ground();
  wall = new Wall();
  sliderX = createSlider(0, 360, x, 1);
  sliderY = createSlider(0, 360, y, 1);
  sliderZ = createSlider(0, 360, z, 1);
  //sliderX.hide();
  //sliderY.hide();
  //sliderZ.hide();
}

function draw() {
  background(220);
  push();
  rotateX(x);
  rotateY(y);
  rotateZ(z);
  ground.display();

  player.display();
  player.update();
  pop();
  x = sliderX.value();
  y = sliderY.value();
  z = sliderZ.value();
}

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.size = 50;
    this.speed = 2;
    this.vx = 1;
    this.vy = 1;
    this.vz = 1;
    this.isJumping = false;
    this.jumpHeight = this.size * 3;
    this.initialZ = this.z;
  }

  display() {
    fill("white");
    push();
    translate(this.x, this.y, this.z + this.size / 2);
    box(this.size);
    pop();
    wall.display();
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed * this.vx;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed * this.vx;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed * this.vy;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed * this.vy;
    }
    if (keyIsDown(32) && !this.isJumping) {
      this.isJumping = true;
      this.initialZ = this.z;
    }
    if (this.isJumping && this.z >= this.jumpHeight) {
      this.vz *= -1;
    }
    if (this.isJumping) {
      this.z += this.speed * this.vz;
      if (this.z <= this.initialZ) {
        this.vz *= -1;
        this.z = this.initialZ;
        this.isJumping = false;
      }
    }

    this.x = constrain(this.x, -width / 2, width / 2);
    this.y = constrain(this.y, -height / 2, height / 2);
    this.z = constrain(this.z, 0, height / 2);
    this.size = constrain(this.size, 0, 50);
  }
}

class Ground {
  display() {
    fill(0, 255, 0);
    plane(width, height);
  }
}

function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  let cnv = document.getElementById('sketch-holder');
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

class Wall {
  constructor() {
    this.bricks = [];
    this.brickSize = 20;
    this.wallLayers = 10;
    this.brickCount = floor(windowWidth / this.brickSize);
    for(let j = 0; j < this.wallLayers; j++) {
      for(let i = 0; i < this.brickCount; i++) {
        this.bricks.push(
          new Brick(
            i * this.brickSize - width/2 + this.brickSize/2,
            -width/2 - this.brickSize/2,
            j * this.brickSize,
            this.brickSize));
        this.bricks.push(
          new Brick(
            width/2 + this.brickSize/2,
            i * this.brickSize - width/2 + this.brickSize/2,
            j * this.brickSize,
            this.brickSize));
      }
    }
  }

  display() {
    for(let i = 0; i < this.bricks.length; i++) {
      this.bricks[i].display();
    }
  }
}

class Brick {
  constructor(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
  }

  display() {
    fill("brown");
    push();
    translate(this.x, this.y, this.z + this.size / 2);
    box(this.size);
    pop();
  }
}