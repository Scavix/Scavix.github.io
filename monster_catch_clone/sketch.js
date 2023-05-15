let game,
  frameCounter = 0,
  gameSpeedInFrames = 60,
  mapSizeInChunks = 3,
  bits = 16,
  meadowImg,
  wallImg,
  playerImg,
  player,
  blocktypes = ["WEADOW", "WALL", "EMPTY"],
  directions = ["UP", "DOWN", "LEFT", "RIGHT"],
  monsterImgs = [],
  picking = true,
  collidedBody,
  gamemode = "WALK",
  currFrontline = 0,
  fightState = "CHOOSE",
  secondsInGame = 0,
  textOffset,
  spawnRateInSeconds = 5;

function preload() {
  meadowImg = loadImage('assets/meadow.png');
  wallImg = loadImage('assets/wall.png');
  playerImg = loadImage('assets/player.png');
  for (let i = 1; i <= 9; i++) {
    monsterImgs.push(loadImage('assets/monster' + i + '.png'));
  }
}

function setup() {
  createCanvas(
    windowWidth < windowHeight ? windowWidth : windowHeight,
    windowWidth < windowHeight ? windowWidth : windowHeight
  );
  textOffset = width / 10;
  game = new Game();
  let chunk = new GameChunk();
  chunk.addMonsterAt(bits / 4, bits / 4, random(monsterImgs));
  chunk.addMonsterAt(bits / 4, bits / 4 * 3, random(monsterImgs));
  chunk.addMonsterAt(bits / 4 * 3, bits / 4 * 3, random(monsterImgs));
  chunk.addMonsterAt(bits / 4 * 3, bits / 4, random(monsterImgs));
  game.addChunkAt(chunk, 0, 0);
  chunk = new GameChunk();
  chunk.addMonsterAt(bits - 1, bits - 1, random(monsterImgs));
  chunk.addMonsterAt(0, 0, random(monsterImgs));
  for (let i = bits / 8; i < bits - bits / 8; i++) {
    for (let j = bits / bits; j < bits / 2; j++) {
      chunk.grid[i][j] = new Block(i, j, "WEADOW");
    }
  }
  game.addChunkAt(chunk, 0, 1);
  player = new Player(bits / 2, bits / 2, playerImg);
}

function draw() {
  if (gamemode == "WALK") {
    background('green');
    if (frameCounter == gameSpeedInFrames) {
      game.move();
      frameCounter = 0;
      secondsInGame++;
      if (secondsInGame % spawnRateInSeconds == 0 && (game.xChunk != 0 || game.yChunk != 0)) {
        game.chunks[game.xChunk][game.yChunk].addMonsterAt(bits / 2, bits / 2, random(monsterImgs));
      }
    }
    game.show();
    player.show();
    if (checkCollision()) {
      game.show();
      player.show();
      if (picking) {
        picking = false;
        player.pick(collidedBody);
        game.xChunk = 0;
        game.yChunk = 1;
      } else {
        gamemode = "FIGHT";
      }
    }
    frameCounter++;
  } else if (gamemode == "FIGHT") {
    if (fightState == "CHOOSE") {
      showFIGHTorRUNMenu();
      fightState = "CHOOSE";
    } else if (fightState == "FIGHT") {
      showFIGHTMenu();
    } else {
      gamemode = "WALK";
      fightState = "CHOOSE";
    }
  }
}
class Game {
  constructor() {
    this.chunks = [];
    for (let i = 0; i < mapSizeInChunks; i++) {
      this.chunks.push([]);
      for (let j = 0; j < mapSizeInChunks; j++) {
        this.chunks[i][j] = new GameChunk();
      }
    }
    this.xChunk = 0;
    this.yChunk = 0;
  }
  addChunkAt(chunk, x, y) {
    this.chunks[x][y] = chunk;
  }
  move() {
    for (let i = 0; i < this.chunks[this.xChunk][this.yChunk].entities.length; i++) {
      this.chunks[this.xChunk][this.yChunk].entities[i].move();
    }
  }
  show() {
    for (let i = 0; i < this.chunks[this.xChunk][this.yChunk].grid.length; i++) {
      for (let j = 0; j < this.chunks[this.xChunk][this.yChunk].grid[i].length; j++) {
        this.chunks[this.xChunk][this.yChunk].grid[i][j].show();
      }
    }
    for (let i = 0; i < this.chunks[this.xChunk][this.yChunk].entities.length; i++) {
      this.chunks[this.xChunk][this.yChunk].entities[i].show();
    }
  }
}

class Monster {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.level = 1;
    this.life = this.level * 10;
    this.fightlife,
    this.moves = [];
    for (let i = 0; i < 4; i++) {
      this.moves.push(new Move());
    }
  }

  move() {
    let dir = random(
      this.x == 0 && this.y == 0 ? ["DOWN", "RIGHT"] :
        this.x == bits - 1 && this.y == bits - 1 ? ["UP", "LEFT"] :
          this.x == 0 && this.y == bits - 1 ? ["UP", "RIGHT"] :
            this.x == bits - 1 && this.y == 0 ? ["DOWN", "LEFT"] :
              this.x == 0 ? ["UP", "DOWN", "RIGHT"] :
                this.x == bits - 1 ? ["UP", "DOWN", "LEFT"] :
                  this.y == 0 ? ["DOWN", "LEFT", "RIGHT"] :
                    this.y == bits - 1 ? ["UP", "LEFT", "RIGHT"] :
                      ["UP", "DOWN", "LEFT", "RIGHT"]);
    if (dir == "UP") {
      this.y = this.y - 1;
    } else if (dir == "DOWN") {
      this.y = this.y + 1;
    } else if (dir == "LEFT") {
      this.x = this.x - 1;
    } else if (dir == "RIGHT") {
      this.x = this.x + 1;
    }
  }

  show() {
    image(this.img,
      this.x * width / bits,
      this.y * height / bits,
      width / bits,
      height / bits);
  }
  levelUp() {
    this.levelUp(1);
  }
  levelUp(levels) {
    this.level += levels;
    this.life = this.level * 10;
  }
}

class Block {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  show() {
    if (this.type == "WEADOW") {
      image(meadowImg,
        this.x * width / bits,
        this.y * height / bits,
        width / bits,
        height / bits);
    } else if (this.type == "WALL") {
      image(wallImg,
        this.x * width / bits,
        this.y * height / bits,
        width / bits,
        height / bits);
    }
  }
}

class Player {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.team = [];
  }

  pick(monster) {
    this.team.push(monster);
  }
  show() {
    image(this.img,
      this.x * width / bits,
      this.y * height / bits,
      width / bits,
      height / bits);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && player.y > 0) {
    player.y = player.y - 1;
  } else if (keyCode === DOWN_ARROW && player.y < bits - 1) {
    player.y = player.y + 1;
  } else if (keyCode === LEFT_ARROW && player.x > 0) {
    player.x = player.x - 1;
  } else if (keyCode === RIGHT_ARROW && player.x < bits - 1) {
    player.x = player.x + 1;
  }
  if (keyCode === 70 && gamemode == "FIGHT") {
    fightState = "FIGHT";
  } else if (keyCode === 82 && gamemode == "FIGHT") {
    fightState = "RUN";
    let monsterIndex = game.chunks[game.xChunk][game.yChunk].entities.indexOf(collidedBody);
    game.chunks[game.xChunk][game.yChunk].entities.splice(monsterIndex, 1);
  }
}

class GameChunk {
  constructor() {
    this.entities = [];
    this.grid = [];
    for (let i = 0; i < bits; i++) {
      this.grid.push([]);
      for (let j = 0; j < bits; j++) {
        this.grid[i][j] = new Block(i, j, "EMPTY");
      }
    }
  }
  addEntity(entity) {
    this.entities.push(entity);
  }
  addEntityAt(s, x, y, img) {
    if (s == 'Monster') {
      this.entities.push(new Monster(x, y, img));
    }
  }
  addMonsterAt(x, y, img) {
    this.addEntityAt('Monster', x, y, img);
  }
  move() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].move();
    }
  }
  show() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].show();
      }
    }
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].show();
    }
  }
}

function checkCollision() {
  for (let i = 0; i < game.chunks[game.xChunk][game.yChunk].entities.length; i++) {
    if (game.chunks[game.xChunk][game.yChunk].entities[i].x == player.x && game.chunks[game.xChunk][game.yChunk].entities[i].y == player.y) {
      collidedBody = game.chunks[game.xChunk][game.yChunk].entities[i];
      return true;
    }
  }
  return false;
}

function showFIGHTorRUNMenu() {
  background(255);
  stroke(0);
  strokeWeight(2);
  fill(255, 0, 0);
  rect(0, 0, width, height / 2);
  fill(0, 0, 255);
  rect(0, height / 2, width, height / 2);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("FIGHT [F]", width / 2, height / 4);
  text("RUN [R]", width / 2, 3 * height / 4);
}

function showFIGHTMenu() {
  background('red');
  image(player.team[currFrontline].img,
    width / 8,
    height / 4,
    width / 4,
    height / 4);
  image(collidedBody.img,
    width / 8 * 5,
    height / 4,
    width / 4,
    height / 4);
  player.team[currFrontline].fightlife = player.team[currFrontline].life;
  collidedBody.fightlife = collidedBody.life;
  showMoves();
  showLifeBars();
}

function showMoves() {
  let moves = player.team[currFrontline].moves;
  for (let i = 0; i < moves.length; i++) {
    fill(255);
    textSize(32);
    textAlign(CENTER, BOTTOM);
    text(i + " " + moves[i].name, width / 2, height / 2 + i * textOffset);
  }
}

class Move {
  constructor() {
    this.name = random(["Bite", "Scratch", "Tackle", "Punch", "Kick", "Headbutt", "Slap", "Poke", "Stab", "Shoot"]);
    this.type = "NORMAL";
    this.power = Math.floor(random(10));
    this.accuracy = 1;
  }
}

function showLifeBars() {
  let playerLife = player.team[currFrontline].life;
  let actualPlayerLife = player.team[currFrontline].fightlife;
  let monsterLife = collidedBody.life;
  let actualMonsterLife = collidedBody.fightlife;
  noFill();
  rect(width / 8,
    height / 2,
    width / 4,
    height / 20);
  fill(0, 255, 0);
  rect(width / 8,
    height / 2,
    width / 4 * (actualPlayerLife/playerLife),
    height / 20);
  noFill();
  rect(width / 8 * 5,
  height / 4 + height / 4,
  width / 4,
  height / 20);
  fill(0, 0, 255);
  rect(width / 8 * 5,
    height / 4 + height / 4,
    width / 4 * (actualMonsterLife/monsterLife),
    height / 20);
  //lvl and numberlife
}