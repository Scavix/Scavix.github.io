let i,
  j,
  k,
  tmp,
  actual,
  song,
  rick,
  ship,
  img,
  img1,
  img2,
  img3,
  backgroundImage,
  col,
  button,
  rickButton,
  projectiles = [],
  aliens = [],
  grades = [],
  started = false,
  sentinel1 = true,
  sentinel2 = true,
  sentinellaS = true,
  killS,
  hitS,
  ms = 0;

function preload() {
  img = loadImage("img/photo.png");
  img1 = loadImage("img/1.png");
  img2 = loadImage("img/2.png");
  img3 = loadImage("img/3.png");
  backgroundImage = loadImage("img/backgroundImage.jpg");
  song = loadSound("assets/song.mp3");
  rick = loadSound("assets/rick.m4a");
  hitS = loadSound("assets/hit.wav");
  killS = loadSound("assets/kill.wav");
}

function initMe() {
  for (i = 0; i < 15; i++) {
    tmp=Math.floor(Math.random() * 3);
    aliens[i] = new Alien(
      tmp,
      tmp == 0 ? img1 : tmp == 1 ? img2 : img3
    );
  }
  ship = new Ship(img);
  actual = 0;
}

function setup() {
  createCanvas(500, 500);
  createCanvas(windowWidth>windowHeight ? windowHeight : windowWidth, windowWidth>windowHeight ? windowHeight : windowWidth);
  initMe();
  background(backgroundImage);
  col = color(25, 23, 200, 50);
  button = createButton('Start');
  button.position(width/2-100, height/3*2);
  button.mousePressed(startMe);
  button.size(200);
  rickButton = color(25, 23, 200, 50);
  rickButton = createButton('toRick');
  rickButton.position(width/2-25, height/2);
  rickButton.mousePressed(toRick);
  rickButton.size(50);
  rickButton.hide();
}

function draw() {
  if(started){
    background(backgroundImage);
    if (actual==aliens.length) {
      finish();
    }else{
      scoreUpdate();
      ship.move();
      aliens[actual].move();
      projectilesMove();
      hit();
      gradesShow();
      upgrade();
    }
  }
}

function startMe() {
  song.loop();
  rick.stop();
  started = true;
  button.hide();
}

function scoreUpdate(){
  fill("white");
  textSize(20);
  text(
    "Score: " + (ship.score).toString(),
    width - 150,
    height - 50
  );
}

function lifeCheck() {
  if (aliens[actual].life <= 0) {
    tmp=aliens[actual].getScore();
    ship.score+=tmp;
    grades.push(new Score(aliens[actual].x,aliens[actual].y,tmp));
    actual++;
    killS.play();
  }
}

function hit() {
  for (j = 0; j < projectiles.length; j++) {
    if (
      dist(
        projectiles[j].x,
        projectiles[j].y,
        aliens[actual].x,
        aliens[actual].y
      ) <
      projectiles[j].size + aliens[j].size
    ) {
      aliens[actual].life -= 1;
      hitS.play();
      projectiles.splice(j, 1);
      lifeCheck();
    }
  }
}

function projectilesMove() {
  for (i = 0; i < projectiles.length; i++) {
    projectiles[i].move();
    if (
      projectiles[i].x <= 0 ||
      projectiles[i].x >= width ||
      projectiles[i].y <= 0 ||
      projectiles[i].x >= height
    ) {
      projectiles.splice(i, 1);
    }
  }
}

function shoot(x, y, speed, damage, size, myColor) {
  projectiles.push(new Projectile(x, y, speed, damage, size, myColor));
}

function finish() {
  if(sentinellaS){
    song.stop();
    rick.loop();
    sentinellaS=false;
  }
  fill('white');
  textSize(40);
  text("Score: " + (ship.score).toString(), 50, 50);
  rickButton.show();
  ms++;
  if(ms>=60*3){
    toRick();
  }
} 

function upgrade(){
  if(ship.score>=1000 && ship.score<2000 && sentinel1==true){
    ship.projectileSpeed=12;
    ship.projectileColor='blue';
    console.log('upgrade');
    sentinel1=false;
  }
  if(ship.score>=2000 && ship.score<=3000 && sentinel2==true){
    ship.projectileSize=45;
    ship.projectileColor='red';
    console.log('upgrade');
    sentinel2=false;
  }
}

function gradesShow() {
  for (i = 0; i < grades.length; i++) {
    grades[i].showMe();
  }
}
