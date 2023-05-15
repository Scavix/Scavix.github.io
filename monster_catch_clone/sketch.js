let game,
  frameCounter = 0,
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
  gamemode = "walk",
  currFrontline = 0;

function preload() {
  meadowImg = loadImage('assets/meadow.png');
  wallImg = loadImage('assets/wall.png');
  playerImg = loadImage('assets/player.png');
  for (let i = 1; i <= 3; i++) {
    monsterImgs[i] = loadImage('assets/monster' + i + '.png');
  }
}

function setup() {
  createCanvas(
    windowWidth < windowHeight ? windowWidth : windowHeight,
    windowWidth < windowHeight ? windowWidth : windowHeight
  );
  game = new Game();
  let chunk = new GameChunk();
  chunk.addMonsterAt(4, 4, random(monsterImgs));
  chunk.addMonsterAt(4, 12, random(monsterImgs));
  chunk.addMonsterAt(12, 12, random(monsterImgs));
  chunk.addMonsterAt(12, 4, random(monsterImgs));
  game.addChunkAt(chunk, 0, 0);
  chunk = new GameChunk();
  chunk.addMonsterAt(bits - 1, bits - 1, random(monsterImgs));
  chunk.addMonsterAt(0, 0, random(monsterImgs));
  for (let i = 2; i < 14; i++) {
    for (let j = 1; j < 8; j++) {
      chunk.grid[i][j] = new Block(i, j, "WEADOW");
    }
  }
  game.addChunkAt(chunk, 0, 1);
  player = new Player(bits / 2, bits / 2, playerImg);
}

function draw() {
  if (gamemode == "walk") {
    background('green');
    if (frameCounter == 60) {
      game.move();
      frameCounter = 0;
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
        gamemode = "fight";
      }
    }
    frameCounter++;
  } else if (gamemode == "fight") {
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
  }
}

class Game {
  constructor() {
    this.chunks = [];
    for (let i = 0; i < 3; i++) {
      this.chunks.push([]);
      for (let j = 0; j < 3; j++) {
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
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    image(this.img,
      this.x * width / bits,
      this.y * height / bits,
      width / bits,
      height / bits);
  }
}

class Block {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  show() {
    stroke(0);
    strokeWeight(2);
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
    stroke(0);
    strokeWeight(2);
    fill(0, 0, 255);
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