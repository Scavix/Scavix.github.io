let rows_cols = 80;
let dim = 800;
let height = dim;
let weight = dim;
let arr = [];
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
  init();
}

function init(){
  for(let i = 0; i<rows_cols ; i++){
    arr[i][0] = 1;
    arr[0][i] = 1;
    arr[i][rows_cols-1] = 1;
    arr[rows_cols-1][i] = 1;
  }
  for(let i = 0; i<rows_cols ; i++){
    arr[rows_cols/2][i] = 1;
    arr[i][rows_cols/2] = 1;
  }
}

function draw() {
  refresh();
  rule();
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
}


function morte(i,k) {
  fill('yellow');
  square(i*dim/rows_cols, k*dim/rows_cols, dim/rows_cols);
}



function vive(i,k) {
  fill('red');
  square(i*dim/rows_cols, k*dim/rows_cols, dim/rows_cols);
}

function rule() {
  for(let i = 0; i<rows_cols; i++){
    for(let k = 0; k<rows_cols; k++){
      if(arr[i][k]==1){
        if(adj(i,k)!=2 && adj(i,k)!=3){arr[i][k]=0;}
      }
      if(arr[i][k]==0){
        if(adj(i,k)==3){arr[i][k]=1;}
      }
    }
  }
}

function adj(i,k){
  let count = 0;
  if(i==0&&k==0){
    if(arr[1][0]==1){count++;}
    if(arr[1][1]==1){count++;}
    if(arr[0][1]==1){count++;}
  }
  else if(i==0&&k==rows_cols-1){
    if(arr[1][rows_cols-2]==1){count++;}
    if(arr[1][rows_cols-1]==1){count++;}
    if(arr[0][rows_cols-2]==1){count++;}
  }
  else if(i==rows_cols-1&&k==0){
    if(arr[rows_cols-2][1]==1){count++;}
    if(arr[rows_cols-1][1]==1){count++;}
    if(arr[rows_cols-2][0]==1){count++;}
  }
  else if(i==rows_cols-1&&k==rows_cols-1){
    if(arr[rows_cols-2][rows_cols-2]==1){count++;}
    if(arr[rows_cols-1][rows_cols-2]==1){count++;}
    if(arr[rows_cols-2][rows_cols-1]==1){count++;}}
  else if(i==0){
    for(let j = -1; j<2; j++){
      if(arr[i+1][k+j]==1){count++;}
    }
    if(arr[i][k-1]==1){count++;}
    if(arr[i][k+1]==1){count++;}
  }
  else if(k==0){
    for(let j = -1; j<2; j++){
      if(arr[i+j][k+1]==1){count++;}
    }
    if(arr[i-1][k]==1){count++;}
    if(arr[i+1][k]==1){count++;}
  }
  else if(i==rows_cols-1){
    for(let j = -1; j<2; j++){
      if(arr[i-1][k+j]==1){count++;}
    }
    if(arr[i][k-1]==1){count++;}
    if(arr[i][k+1]==1){count++;}
  }
  else if(k==rows_cols-1){
    for(let j = -1; j<2; j++){
      if(arr[i+j][k-1]==1){count++;}
    }
    if(arr[i-1][k]==1){count++;}
    if(arr[i+1][k]==1){count++;}
  }
  else{
    for(let j = -1; j<2; j++){
      if(arr[i-1][k+j]==1){count++;}
      if(arr[i][k+j]==1&&j!=0){count++;}
      if(arr[i+1][k+j]==1){count++;}
    }
  }
  return count;
}