let lines = 64;
let width = 1024;
let height = 1024;
let arr = [];
function setup() {
  createCanvas(width, height);
  for (let i = 0; i < lines ; i++) {
    arr[i] = [];
  }
  for (let i = 0; i < lines; i++) {
    for (let k = 0; k < lines; k++) {
      arr[k][i] = 0;
    }
  }
  init();
  colour();
  grid();
  frameRate(2);
}

function draw() {
  next();
  colour();
  grid();
}

function grid(){
  stroke(0);
  for(let i = 0; i <= lines; i++){
    line(i*width/lines,0,i*width/lines,height);
    line(0,i*height/lines,width,i*height/lines);
  }
}

function init(){
  for(let i = 0; i < lines; i++){
    for(let k = 0; k < lines; k++){
      arr[i][k]= floor(random(2));
    }
  }
}

function next(){
  let old = arr;
  for(let i = 0; i < lines; i++){
    for(let k = 0; k < lines; k++){
      arr[i][k] = calculate(old,i,k);
    }
  }
}

function rule(sx, cx, dx){
  if(sx==1&&cx==1&&dx==1){return 0;}
  if(sx==1&&cx==1&&dx==0){return 0;}
  if(sx==1&&cx==0&&dx==1){return 0;}
  if(sx==0&&cx==0&&dx==0){return 0;}
  if(sx==1&&cx==0&&dx==0){return 1;}
  if(sx==0&&cx==1&&dx==1){return 1;}
  if(sx==0&&cx==1&&dx==0){return 1;}
  if(sx==0&&cx==0&&dx==1){return 1;}
  return -1;
}

function colour() {
  noStroke();
  for(let i = 0; i < lines; i++){
    for(let k = 0; k < lines; k++){
      if(arr[k][i]==1){fill(0);}
      else{fill(255);}
      rect(k*width/lines,i*height/lines,width/lines,height/lines);
    }
  }
}

function calculate(mono, i, k){
  let result = 1;
  let count=0;
  if(i==0||k==0||i==lines-1||k==lines-1){
    if(i==0&&k!=lines-1){
      //0 0
      if(k==0){
        if(mono[0][1]==1){count++;}
        if(mono[1][1]==1){count++;}
        if(mono[1][0]==1){count++;}
      }
      //first line
      else{
        for(let ii = -1; ii < 2; ii++){
          if(ii==0){
            if(mono[i+1][k+ii]==1){count++;}
          }
          else{
            if(mono[i][k+ii]==1){count++;}
            if(mono[i+1][k+ii]==1){count++;}
          }
        }      
      }
    }
    else if(i!=lines-1&&k==lines-1){
      //0 n-1
      if(i==0){
        if(mono[0][lines-2]==1){count++;}
        if(mono[1][lines-2]==1){count++;}
        if(mono[1][lines-1]==1){count++;}
      }
      //last column
      else{
        for(let ii = -1; ii < 2; ii++){
          if(ii==0){
            if(mono[i+ii][k-1]==1){count++;}            
          }
          else{
            if(mono[i+ii][k-1]==1){count++;}
            if(mono[i+ii][k]==1){count++;}
          }
        }
      }
    }
    else if(i==lines-1&&k!=0){
      //n-1 n-1
      if(k==lines-1){
        if(mono[lines-1][lines-2]==1){count++;}
        if(mono[lines-2][lines-2]==1){count++;}
        if(mono[lines-2][lines-1]==1){count++;}
      }
      //last line
      else{
        for(let ii = -1; ii < 2; ii++){
          if(ii==0){
            if(mono[i-1][k+ii]==1){count++;}            
          }
          else{
            if(mono[i-1][k+ii]==1){count++;}
            if(mono[i][k+ii]==1){count++;}
          }
        }
      }
    }
    else if(i!=0&&k==0){
      //n-1 0
      if(i==lines-1){
        if(mono[lines-1][lines-2]==1){count++;}
        if(mono[lines-2][lines-2]==1){count++;}
        if(mono[lines-2][lines-1]==1){count++;}
      }
      //first column
      else{
        for(let ii = -1; ii < 2; ii++){
          if(ii==0){
            if(mono[i+ii][k+1]==1){count++;}            
          }
          else{
            if(mono[i+ii][k]==1){count++;}
            if(mono[i+ii][k+1]==1){count++;}
          }
        }
      }
    }
  }
  else{
    for(let ii = -1; ii < 2; ii++){
      if(ii==0){
        if(mono[i-1][k+ii]==1){count++;}          
        if(mono[i+1][k+ii]==1){count++;}
      }
      else{
        if(mono[i-1][k+ii]==1){count++;}          
        if(mono[i][k+ii]==1){count++;}
        if(mono[i+1][k+ii]==1){count++;}
      }
    }
  }
  if(count<2||count>3){result=0;}
  return result;
}
