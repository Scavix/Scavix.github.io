let valuex = 0;
let valuey = 0;
let size = 8;
let backgroundI,
  meI,
  enemies,
  platform,
  walls,
  planet,
  i,
  j,
  enemyI,
  planetI,
  planetDamage,
  planetSize,
  planetSpeed,
  tmp;

function preload() {
  planetI = loadImage("planet.png");
  enemyI = loadImage("enemy.png");
  backgroundI = loadImage("background.jpg");
  meI = loadImage("me.png");
}

function setup() {
  createCanvas(
    windowWidth > windowHeight ? windowHeight : windowWidth,
    windowWidth > windowHeight ? windowHeight : windowWidth
  );
  enemies = new Enemies(size, enemyI);
  platform = new Platform(size, meI);
  planetSize = width / 15;
  planetSpeed = 5;
  planetDamage = 1;
  planet = new Planet(
    150,
    (height / 4) * 3,
    planetSpeed,
    planetSpeed,
    planetDamage,
    planetSize,
    planetI
  );
  walls = new Walls(width, height);
}

function draw() {
  background(backgroundI);
  enemies.drawAll();
  platform.drawMe();
  walls.drawAll();
  planet.move();
  enemies.hit(planet.x, planet.y, planet.size);
  platform.hit(planet.x, planet.y, planet.size);
  walls.hit(planet.x, planet.y, planet.size);
  enemies.checkWin();
}
