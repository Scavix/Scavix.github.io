let myAgent, prevDist, myReward, myFieldsMap, factor = 10, grid = 10, game = true, upScore = 0, downScore = 0, leftScore = 0, rightScore = 0;
function setup() {
  createCanvas(500,500);
  frameRate(10);
  prevDist=factor*factor;
  myAgent = new Agent(5, 5, loadImage('assets/agent.png'), width / factor);
  myReward = new Reward(9, 5, loadImage('assets/reward.png'), width / factor);
  myFieldsMap = new FieldsMap(grid, loadImage('assets/field.jpg'), width / factor);
  ShowAll();
}

function draw() {
  if (game) {
    NextState();
    ShowAll();
  }
}

function NextState() {
  let dir = random(['up', 'down', 'left', 'right']);
  while (!myFieldsMap.checkMove(myAgent.x, myAgent.y, dir)) {
    dir = random(['up', 'down', 'left', 'right']);
  }
  myAgent.move(dir);
  let tmp = (myAgent.x==myReward.x)?abs(myAgent.y-myReward.y) : (myAgent.y==myReward.y)?abs(myAgent.x-myReward.x):sqrt(pow(myAgent.x-myReward.x,2)+pow(myAgent.y-myReward.y,2));
  console.log(prevDist,tmp,dir);
  if(tmp<prevDist){
    if (dir == 'up') {
      upScore++;
    }
    if (dir == 'down') {
      downScore++;
    }
    if (dir == 'left') {
      leftScore++;
    }
    if (dir == 'right') {
      rightScore++;
    }
  }
  prevDist=tmp;
  console.log(upScore, downScore, leftScore, rightScore);
  if (myAgent.x == myReward.x && myAgent.y == myReward.y) {
    game = false;
  }
}


function ShowAll() {
  background(220);
  myFieldsMap.show();
  myReward.show();
  myAgent.show();
}