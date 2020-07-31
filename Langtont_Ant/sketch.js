let rows_cols = 41;
let dim = 800;
let height = dim;
let weight = dim;
let arr = [];
let posx = 20;
let posy = 20;
let dir = 0;
//0=dx
//1=nt
//2=sx
//3=sd
function setup() {
  createCanvas(weight, height);
  frameRate(10);
  background(220);
  for(let i = 0; i<= rows_cols ; i++){
    line(i*(height/rows_cols),0,i*(height/rows_cols),height);
    line(0,i*(weight/rows_cols),weight,i*(height/rows_cols));
  }
  for(let i = 0; i<rows_cols ; i++){
    arr[i]=[];
    for(let k = 0; k<rows_cols ; k++){
      arr[i][k]=0;
    }
  }
}

function draw() {
  rule();
  refresh();
}


function refresh() {
  for(let i = 0; i<rows_cols; i++){
    for(let k = 0; k<rows_cols; k++){
      if(arr[i][k]==1){
        vive(i,k);
      }
      else{
        morte(i,k);
      }
    }
  }
  ant(posx,posy);
}

function rule() {
  if(arr[posx][posy]==0){
    if(dir==3){
      dir=0;
    }
    else{
      dir++;
    }
    arr[posx][posy]=1;
    if(dir==0){posx--;}
    else if(dir==1){posy++;}
    else if(dir==2){posx++;}
    else {posy--;}
  }
  else{
    if(dir==0){
      dir=3;
    }
    else{
      dir--;
    }
    arr[posx][posy]=0;
    if(dir==0){posy++;}
    else if(dir==1){posx++;}
    else if(dir==2){posy--;}
    else {posx--;}
  } 
}

function ant(x,y) {
  fill(255);
  circle(x*ceil(dim/rows_cols),y*ceil(dim/rows_cols),dim/rows_cols);
}

function morte(i,k) {
  fill('blue');
  square(i*dim/rows_cols, k*dim/rows_cols, dim/rows_cols);
}

function vive(i,k) {
  fill('yellow');
  square(i*dim/rows_cols, k*dim/rows_cols, dim/rows_cols);
}