let birdImg, backgroundImg, endingImg, pillarFactory, pillars,
  gameSpeed,
  bird, jump,
  jumpSize,
  game,
  button,
  score, distance, instructions, instructionsTimer, finalScore, finalDist;

function init() {
  pillars = [];
  score = 0;
  instructions = 'Press SPACE/CLICK to JUMP';
  instructionsTimer = 60 * 5;
  distance = 0;
  game = true;
  jumpSize = 60;
  jump = 0;
  gameSpeed = 2;
  pillarFactory = new PillarFactory(height / 8);
  bird = new Bird(birdImg, height / 8);
  button = createButton('Restart');
  button.hide();
  button.position(width / 2 - 20, height / 4 * 3);
  button.mousePressed(restart);
}

function preload() {
  birdImg = loadImage('assets/bird.png');
  backgroundImg = loadImage('assets/background.png');
  endingImg = loadImage('assets/ending.jpg');
}

function setup() {
  createCanvas(400, 400);
  init();
}

function draw() {
  if (game) {
    move();
    drawAll();
  } else {
    background(endingImg);
    fill('yellow')
    textSize(height/8);
    text('Thank you for playing', width/20, height/20, width/2);
    finalDist=distance;
    finalScore=score;
    scoresShow(finalScore,finalDist,true);
    button.show();
  }
}

function showInstructions() {
  if (instructionsTimer > 0) {
    textSize(height / 20);
    fill('red');
    text(instructions, height / 10, width / 4 * 3);
    instructionsTimer--;
  }
}

function restart() {
  button.hide();
  init();
}

function drawAll() {
  background(backgroundImg);
  bird.drawMe();
  for (let i = 0; i < pillars.length; i++) {
    pillars[i].drawMe();
  }
  scoresShow(score,distance,false);
  showInstructions();
}

function scoresShow(myScore,myDistance,isEnd) {
  let xScore,yScore,xDist,yDist;
  if(isEnd){
    xScore=width/4*3;
    yScore=height/4*3;
    xDist=width/4*3;
    yDist=yScore+20;
  } else {
    xScore=width - 60;
    yScore=20;
    xDist=20;
    yDist=height-20;
  }
  fill('red');
  textSize(12);
  text('Score: ' + myScore, xScore, yScore);
  text('Distance: ' + myDistance, xDist, yDist);
}

function move() {
  if (pillars.length != 1) {
    pillars.push(pillarFactory.gimmePillar());
  }
  for (let i = 0; i < pillars.length; i++) {
    pillars[i].x -= gameSpeed;
    if (pillars[i].x + pillars[i].s < 0) {
      pillars.splice(i);
      score++;
      gameSpeed *= 1.2;
    }
  }
  if (jump > 0 && jumpSize > 0) {
    bird.y -= 6;
    jumpSize -= 6;
  } else if (jump < 0) {
    jumpSize = 60;
  }
  bird.y += 2;
  jump -= 6;
  check();
  distance++;
}

function check() {
  if (bird.outMap()) {
    game = false;
    return;
  }
  for (let i = 0; i < pillars.length; i++) {
    if (pillars[i].hit(bird)) {
      game = false;
      return;
    }
  }
}

function keyPressed() {
  if (keyCode === 32 && jump <= 0) {
    jump = 40;
  }
}

function mouseClicked(){
  if (jump <= 0) {
    jump = 40;
  }
}

class Bird {
  constructor(img, s) {
    this.x = 0;
    this.y = height / 4;
    this.img = img;
    this.s = s;
  }
  drawMe() {
    image(this.img, this.x, this.y, this.s, this.s);
  }
  outMap() {
    if (this.y + this.s < 0 || this.y > height) {
      return true;
    }
    return false;
  }
}

class Pillar {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }
  drawMe() {
    fill('brown');
    rect(this.x, this.y, this.s, height);
  }

  hit(bird) {
    if (bird.x + bird.s / 2 > this.x && bird.x + bird.s / 2 < this.x + this.s) {
      if (bird.y + bird.s / 2 > this.y) {
        return true;
      }
    }
    return false;
  }
}

class DoublePillar {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }

  drawMe() {
    fill('green');
    rect(this.x, this.y, this.s, height);
    rect(this.x, 0 - 5, this.s, this.y - 2 * this.s);
  }

  hit(bird) {
    if (bird.x + bird.s / 2 > this.x && bird.x + bird.s / 2 < this.x + this.s) {
      if (bird.y + bird.s / 2 > this.y) {
        return true;
      }
      if (bird.y < this.y - 2 * this.s) {
        return true;
      }
    }
    return false;
  }
}

class PillarFactory {
  constructor(s) {
    this.s = s;
  }

  gimmePillar() {
    if (random([true, false])) {
      return new Pillar(width, this.gimmeHeigth(), this.s);
    } else {
      return new DoublePillar(width, this.gimmeHeigth(), this.s);
    }
  }

  gimmeHeigth() {
    let arr = [];
    for (let i = 80; i < height - (this.s * 2); i += 20) {
      arr.push(i);
    }
    return random(arr);
  }
}