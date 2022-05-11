let sectionsSize, counter, seconds, game, sentinel, numOfSections, timeShift, dir = 0;

function setup() {
  createCanvas(400, 400);
  numOfSections = 10;
  sectionsSize = width / numOfSections;
  timeShift = 20;
  reset();
}

function draw() {
  background(220);
  line(0,sectionsSize,width,sectionsSize);
  if (seconds >= timeShift) {
    seconds = 0;
    game.move(dir);
    if (game.checkFinish()) {
      alert("You Win");
      reset();
    }
  }
  game.show();
  seconds++;
}

function reset() {
  game = new Game();
  counter = 0;
  seconds = 0;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    dir = -1;
  } else if (keyCode === RIGHT_ARROW) {
    dir = +1;
  }
}