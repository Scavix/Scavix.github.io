let colpito=0;
let sparate=0;
let AR = 200*200*200;
function setup() {
  createCanvas(700, 700,WEBGL);
  
}

function draw() {
  background(200,20,200);
  ortho();
  rotateZ(PI/3);
  rotateX(-PI/6);  
  rotateY(PI/3);
  push();
  fill(204, 102, 0);
  lights();
  rotateX(sparate*0.001);
  sphere(100);
  pop();
  box(200);
  noFill();
  if(sparate<10000){
    sparate++;
    shot();
  }
  print((colpito*AR*3)/(sparate*pow(100,3)*4));
}

function shot(){
  var x = random(-100, 100);
  var y = random(-100, 100);
  var z = random(-100, 100);
  push();
  fill(104, 102, 40);
  translate(x,y,z);
  sphere(10);
  pop();
  if((pow(x,2)+pow(y,2)+pow(z,2))<=pow(100,2)){
     colpito++;
  }
}