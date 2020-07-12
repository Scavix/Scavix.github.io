let n = 100000;
let AC=0;
let Tot=0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  rect(50,50,300,300);
  fill(204, 102, 0);
  circle(width/2,height/2,300);
  fill(4, 102, 100);
  line(200,0,200,400);
  line(0,200,400,200);
  if(n>0){
  shot (n);
  n--;
  } 
    print((AC*300*300)/(Tot*150^2));
}

function shot(n){
  var x = random(50, 350);
  var y = random(50, 350);
  circle(x, y, 10);
  Tot++;
  if((pow(x-width/2,2)+pow(y-height/2,2))<=pow(150,2)){
     AC++;
  }
}