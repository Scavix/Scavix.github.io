let rows = 103;
let cols = 41;
let dim = 10;
let arr = [];
function setup() {
  createCanvas(rows*dim, cols*dim);
  background(220);
  for(let i = 0; i < rows; i++){arr[i]=[];for(let k = 0; k < cols; k++){arr[i][k]=0;}}
  let today = int(52.1429*21);
  print(today);
  let count = 0;
  for(let i = 0; i < rows; i++){
    for(let k = 0; k < cols; k++){
      if(count>=today){break;}
      arr[i][k]=1
      count++;
    }
  }
  grid();
  
}

function draw() {
}

function grid(){
  for(let i = 0; i < rows; i++){
    for(let k = 0; k < cols; k++){
      if(arr[i][k]==1){
        fill('red');
        square(i*dim,k*dim,dim);   
      }
      else{
        fill('blue');
        square(i*dim,k*dim,dim);
      }
    }
  }
}