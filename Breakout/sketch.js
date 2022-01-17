class Star{
  constructor(x,y,s,d){
    this.x=x;
    this.y=y;
    this.s=s;
    this.d=d
  }
  checkBoundary(){
    if(this.x<=0||this.y<=0||this.x>=600||this.y>=600){
       return true;
    }
    return false;
  }
  move(){
    if(this.checkBoundary()){
      this.s*=-1;
    }
    if(this.x>=0&&this.x<=600&&this.y<=600&&this.y>=0){
      circle(this.x,this.y,this.d);
      this.x+=this.s;
      this.y+=this.s;
    }
  }
}
class Me{
  constructor(posx,posy,rectx,recty){
    this.posx=posx;
    this.posy=posy;
    this.rectx=rectx;
    this.recty=recty;
  }
  move(){
    rect(this.posx,this.posy,this.rectx,this.recty);
    if(mouseX<600-25 && mouseX>0+25){
       this.posx = mouseX-25;
    }
  }
}

let star = new Star(300,300,5,10);
let me = new Me(300,500,50,20);

function setup(){
  createCanvas(600, 600);
}

function draw(){
  background('green');
  checkCollisions(star,me);
  star.move();
  me.move();
}

function checkCollisions(star,me){
  if(star.y>=me.posy-10 && star.y<=me.posy+10 && star.x>=me.posx-25+25 && star.x<=me.posx+25+25){
    star.s*=-1
  }
}