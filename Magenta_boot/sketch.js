let choiches = [0,1,2,3,4,5,6,7,8,9];
let lines = 100;
let height = 1024;
let weight = height;
function setup() {
  createCanvas(weight, height);
  background(220);
  textSize(weight/lines/2);
  for(let i = 0 ; i < lines+1 ; i++){
    line(i*weight/lines,0,i*weight/lines,height);
    line(0,i*weight/lines,weight,i*weight/lines);
  }
  for(let i = 0 ; i < lines ; i++){
    for(let k = 0; k < lines ; k++){
      text(random(choiches), k*weight/lines+weight/lines/2, i*weight/lines+weight/lines/2);}
  }
}

function draw() {
  
}