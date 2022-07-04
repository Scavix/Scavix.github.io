let t,size,old,gameOn,dir;
function setup() {
  createCanvas(360,540);
  gameOn=true;
  dir=0;
  size=width/9;
  old=[];//arr of blocks till now
  t=blockGenerator();
}

function draw() {
  if(gameOn){
    background(220);
    oldShow();
    t.show();
    t.move();
    check();
  }
}

function oldShow(){
  for(let i = 0; i<old.length; i++){
    old[i].show();
  }
}

function blockGenerator(){
  let myTmp = Math.floor(Math.random()*5)+1;
  return new Tet(getArrayOfBlocksFromTetraminoType(myTmp),myTmp);
}

function getArrayOfBlocksFromTetraminoType(intType){
  let result = [];
  switch(intType) {
    case 1:
      for(let i = 0; i<4; i++){
        result.push(new Block(i*size,0));
      }
    break;
    case 2:
      for(let i = 0; i<2; i++){
        result.push(new Block(i*size,0));
        result.push(new Block(i*size,-size));
      }
    break;
    case 3:
      for(let i = 0; i<3; i++){
        result.push(new Block(i*size,0));
      }
      result.push(new Block(0,-size));
    break;
    case 4:
      for(let i = 0; i<2; i++){
        result.push(new Block(i*size,0));
      }
      for(let i = 1; i<3; i++){
        result.push(new Block(i*size,-size));
      }
    break;
    case 5:
      for(let i = 0; i<3; i++){
        result.push(new Block(i*size,0));
      }
      result.push(new Block(size,-size));
    break;
    default:
      console.log('Generation Error');
  }
  return result;
}

function check(){
  if(collision()){
    for(let i = 0; i<t.arr.length; i++){
      old.push(t.arr[i]);
    }
    t=blockGenerator();
  }
  tetris();
}

function collision(){
  if(wallCollision()||tetCollision()){
    return true;
  }
  return false;
}

function wallCollision(){
  for(let i = 0; i<t.arr.length; i++){
    if(t.arr[i].y+size>=height){
      return true;
    }
  }
  return false;
}

function tetCollision(){
  let tmpX,tmpY;
  for(let i = 0; i<t.arr.length; i++){
    tmpX = t.arr[i].x;
    tmpY = t.arr[i].y;
    for(let j = 0; j<old.length; j++){
        if(tmpX!=old[j].x){
          continue;
        }
        if(tmpY+size>=old[j].y){
          if(tmpY<=size){
            lost();
          }
          return true;
        }
    }
  }
  return false;
}

function lost(){
  gameOn=false;
}

function tetris(){
  
}

class Block{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.size=size;
    this.colored;
  }
  show(){
    fill(this.colored);
    square(this.x,this.y,this.size);
  }
  move(intDir){
    this.y+=3;
    this.x+=size*intDir;
  }
}

class Tet{
  constructor(arr,intType){
    let colored=color(random(255), random(255), random(255));
    this.intType=intType;
    this.arr=[];
    for(let i = 0; i<arr.length; i++){
      this.arr.push(arr[i]);
      this.arr[i].colored=colored;
    }
  }
  show(){
    for(let i = 0; i<this.arr.length; i++){
      this.arr[i].show();
    }
  }
  move(){
    let myTmp = dir;
    for(let i = 0; i<this.arr.length; i++){
      this.arr[i].move(myTmp);
    }
    dir=0;
  }
  rotate(){/*
    switch(this.intType) {
      case 1:
        this.arr[0].x+=2*size;
        this.arr[0].y-=2*size;
        this.arr[1].x+=size;
        this.arr[1].y-=size;
        this.arr[2].x-=size;
        this.arr[2].y+=size;
        this.arr[3].x-=2*size;
        this.arr[3].y+=2*size;
      break;
      case 2:
        console.log('ok');
      break;
      case 3:
        for(let i = 0; i<4; i++){
          this.arr[i].x=this.arr[2].x;
          this.arr[i].y-=2*size;
        }
      break;
      case 4:
      break;
      case 5:
      break;
      default:
        console.log('Error type');
      }*/
  }
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    dir=-1;
  } else if (keyCode === RIGHT_ARROW) {
    dir=1;
  } else if (keyCode == 90){
    t.rotate();
  }
}