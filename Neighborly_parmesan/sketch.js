let colpito=0;
let sparate=0;
function setup() {
  createCanvas(700, 700);
}

function draw() {
  let AR = width*height;
  let result = colpito*AR/sparate/pow(350,2);
  push();
  fill(100);
  rect(0, 0, 700, 700);
  pop();
  translate(350,350);
  circle(0,0,width);
  line(0,-width/2,0,350);
  line(-width/2,0,width/2,0);
  if(sparate<10000){
    sparate++;
    shot();
  }
  print(result);
  push();
  textSize(24);
  text("Iteration:"+sparate,10,50);
  text(result,10,100);
  fill(0, 102, 153);
  pop();
}

function shot(){
  var x = random(-350, 350);
  var y = random(-350, 350);
  circle(x, y, 10);
  if((pow(x,2)+pow(y,2))<=pow(350,2)){
    colpito++;
  }
}