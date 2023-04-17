let myPoints = [],
  myMap,
  pickTurrets = [],
  turretsColour = ["red", "blue", "green", "yellow"],
  costs = [],
  enemies = [],
  coins = 0,
  turretMode = "red",
  myOverlay,
  enemiesKilled = 0,
  projectiles = [],
  difficulty = [1, 2, 3],
  redImg,
  blueImg,
  greenImg,
  yellowImg,
  enemyImg,
  images = [];

function preload() {
  redImg = loadImage('assets/red.png');
  blueImg = loadImage('assets/blue.png');
  greenImg = loadImage('assets/green.png');
  yellowImg = loadImage('assets/yellow.png');
  enemyImg = loadImage('assets/enemy.png');
}

function setup() {
  createCanvas(
    windowWidth < windowHeight ? windowWidth : windowHeight,
    windowWidth < windowHeight ? windowWidth : windowHeight
  );
  images.push(redImg);
  images.push(blueImg);
  images.push(greenImg);
  images.push(yellowImg);
  images.push(enemyImg);
  myMap = new GameMap();
  myMap.gamePath.addPoint(new GamePoint(width / 10, 0));
  myMap.gamePath.addPoint(new GamePoint(width / 10, height / 10 * 9));
  myMap.gamePath.addPoint(new GamePoint(width / 2, height / 10 * 9));
  myMap.gamePath.addPoint(new GamePoint(width / 2, height / 10));
  myMap.gamePath.addPoint(new GamePoint(width / 10 * 9, height / 10));
  myMap.gamePath.addPoint(new GamePoint(width / 10 * 9, height / 10 * 8));
  myMap.gamePath.addPoint(new GamePoint(width, height / 10 * 8));
  myMap.gamePath.addConnection(new GameConnection(myMap.gamePath.points[0], myMap.gamePath.points[1]));
  myMap.gamePath.addConnection(new GameConnection(myMap.gamePath.points[1], myMap.gamePath.points[2]));
  myMap.gamePath.addConnection(new GameConnection(myMap.gamePath.points[2], myMap.gamePath.points[3]));
  myMap.gamePath.addConnection(new GameConnection(myMap.gamePath.points[3], myMap.gamePath.points[4]));
  myMap.gamePath.addConnection(new GameConnection(myMap.gamePath.points[4], myMap.gamePath.points[5]));
  myMap.gamePath.addConnection(new GameConnection(myMap.gamePath.points[5], myMap.gamePath.points[6]));
  myMap.gamePath.addTowerPoint(new GameTowerPoint(width / 5, height / 5));
  myMap.gamePath.addTowerPoint(new GameTowerPoint(width / 5 * 2, height / 5 * 2));
  myMap.gamePath.addTowerPoint(new GameTowerPoint(width / 5 * 2, height / 5 * 4));
  myMap.gamePath.addTowerPoint(new GameTowerPoint(width / 5 * 3, height / 5 * 2));
  myMap.gamePath.addTowerPoint(new GameTowerPoint(width / 5 * 4, height / 10 * 7));
  for (let i = 0; i < 4; i++) {
    pickTurrets.push(new GameTower(width / 2 + (i + 1) * width / 10, width / 10 * 9, width / 20, turretsColour[i]));
    costs.push(this.cost = Math.floor(random(i * difficulty[0] * 5 + 1, (i + 1) * difficulty[0] * 5)));
  }
  addOverlay(pickTurrets[0].x, pickTurrets[0].y);
  enemies.push(new GameEnemy(myMap.gamePath));
}

function draw() {
  background(220);
  myOverlay.show();
  updateScore();
  myMap.show();
  for (let i = 0; i < pickTurrets.length; i++) {
    pickTurrets[i].show();
  }
  showCosts();
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].show();
    enemies[i].move();
  }
  for (let i = 0; i < projectiles.length; i++) {
    projectiles[i].show();
    projectiles[i].move();
  }
  myMap.shot();
  cleanProjectiles();
  cleanEnemies();
}

function cleanProjectiles() {
  for (let i = 0; i < projectiles.length; i++) {
    if (projectiles[i].x > width || projectiles[i].x < 0 || projectiles[i].y > height || projectiles[i].y < 0) {
      projectiles.splice(i, 1);
    }
  }
}

function cleanEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x > width || enemies[i].x < 0 || enemies[i].y > height || enemies[i].y < 0) {
      enemies.splice(i, 1);
    }
  }
}

class GameTower {
  constructor(x, y, s, type) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.type = type;
    this.range = width / 4;
  }
  show() {
    fill(this.type);
    square(this.x, this.y, this.s);
    image(images[turretsColour.indexOf(this.type)], this.x, this.y, this.s, this.s);
  }
  shotEnemy() {
    for (let i = 0; i < enemies.length; i++) {
      if (dist(this.x, this.y, enemies[i].x, enemies[i].y) < this.range) {
        projectiles.push(new Projectile(this.x + this.s / 2, this.y + this.s / 2, enemies[i].x, enemies[i].y, this.type));
      }
    }
  }
}

class GameMap {
  constructor() {
    this.towers = [];
    this.gamePath = new GamePath();
  }
  addTower(t) {
    this.towers.push(t);
  }
  show() {
    this.gamePath.show();
    for (let i = 0; i < this.towers.length; i++) {
      this.towers[i].show();
    }
  }
  shot() {
    for (let i = 0; i < this.towers.length; i++) {
      this.towers[i].shotEnemy();
    }
  }
}

class GamePath {
  constructor() {
    this.points = [];
    this.connections = [];
    this.towerPoints = [];
  }
  addPoint(p) {
    this.points.push(p);
  }
  addConnection(c) {
    this.connections.push(c);
  }
  addTowerPoint(tp) {
    this.towerPoints.push(tp);
  }
  show() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].show();
    }
    for (let i = 0; i < this.connections.length; i++) {
      this.connections[i].show();
    }
    for (let i = 0; i < this.towerPoints.length; i++) {
      this.towerPoints[i].show();
    }
  }
}

class GamePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    fill(0);
    circle(this.x, this.y, width / 50);
  }
}

class GameConnection {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  show() {
    stroke(0);
    strokeWeight(10);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    strokeWeight(1);
  }
}

class GameTowerPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.full = false;
  }
  show() {
    fill('white');
    circle(this.x, this.y, width / 10);
  }
}

function mouseClicked() {
  for (let i = 0; i < myMap.gamePath.towerPoints.length; i++) {
    if (dist(mouseX, mouseY, myMap.gamePath.towerPoints[i].x, myMap.gamePath.towerPoints[i].y) < width / 10) {
      if (myMap.gamePath.towerPoints[i].full == false && coins >= costs[turretsColour.indexOf(turretMode)]) {
        myMap.addTower(new GameTower(myMap.gamePath.towerPoints[i].x - width / 20, myMap.gamePath.towerPoints[i].y - width / 20, width / 10, turretMode));
        myMap.gamePath.towerPoints[i].full = true;
        coins -= costs[turretsColour.indexOf(turretMode)];
      }
    }
  }
  for (let i = 0; i < pickTurrets.length; i++) {
    if (dist(mouseX, mouseY, pickTurrets[i].x, pickTurrets[i].y) < pickTurrets[i].s) {
      addOverlay(pickTurrets[i].x, pickTurrets[i].y);
      turretMode = pickTurrets[i].type;
    }
  }
}

function updateScore() {
  fill("black");
  textAlign(RIGHT, TOP);
  textSize(20);
  text(`Coins: ${coins}`, width - 10, 10);
  if (frameCount % 60 == 0) {
    coins++;
  }
}

function addOverlay(x, y) {
  myOverlay = new MyOverlay(x, y);
}

class MyOverlay {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    fill("black");
    square(this.x - width / 20 / 2, this.y - width / 20 / 2, width / 10);
  }
}

function showCosts() {
  fill("white");
  textSize(15);
  for (let i = 0; i < pickTurrets.length; i++) {
    text(costs[i], pickTurrets[i].x + width / 20, pickTurrets[i].y + width / 20);
  }
}

class GameEnemy {
  constructor(path) {
    this.point = 0;
    this.x = path.points[this.point].x;
    this.y = path.points[this.point].y;
    this.life = enemiesKilled * Math.floor(random(5)) + 1;
    this.path = path;
    this.speed = width / 250 * difficulty[0];
    this.toRemove = false;
  }
  show() {
    if (!this.toRemove) {
      fill('white');
      circle(this.x, this.y, width / 20);
      image(images[4], this.x - width / 20 / 2, this.y - width / 20 / 2, width / 20, width / 20);
    }
  }
  move() {
    if (this.toRemove) {
      return;
    }
    let xDist = this.path.points[this.point + 1].x - this.x;
    let yDist = this.path.points[this.point + 1].y - this.y;
    this.x += (xDist < this.speed && xDist >= 0) ? 0 : (xDist < this.speed && xDist < 0) ? -this.speed : this.speed;
    this.y += (yDist < this.speed && yDist >= 0) ? 0 : (yDist < this.speed && yDist < 0) ? -this.speed : this.speed;
    this.check();
  }
  check() {
    let xDist = this.path.points[this.point + 1].x - this.x;
    let yDist = this.path.points[this.point + 1].y - this.y;
    if (
      (abs(xDist) < this.speed)
      &&
      (abs(yDist) < this.speed)) {
      if (this.point + 1 == this.path.points.length - 1) {
        this.toRemove = true;
        enemiesKilled++;
        enemies.push(new GameEnemy(myMap.gamePath));
        return;
      }
      this.x = this.path.points[this.point + 1].x;
      this.y = this.path.points[this.point + 1].y;
      this.point++;
    }
  }
}

class Projectile {
  constructor(x, y, x2, y2, type) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.speed = 5;
    this.angle = atan2(y2 - y, x2 - x);
    this.type = type;
    this.damage = difficulty[0];
  }
  show() {
    if (!this.toRemove) {
      fill(this.type);
      circle(this.x, this.y, width / 50);
    }
  }
  move() {
    if (this.toRemove) {
      return;
    }
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.toRemove = true;
    }
  }
}