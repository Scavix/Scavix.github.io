class Room{
  constructor(x,y,color,size,active,adjs) {
    this.x=x;
    this.y=y;
    this.color=color;
    this.size=size;
    this.active=active;
    this.adjs=null;
  }
}
 
class Env{
  constructor(dim){
    this.rooms=[];
    if(dim===undefined){
      this.dim=10;
    }
    else{
      this.dim=dim;
    }
  }
  init(){
    let temp=[];
    let xs=[];
    let ys=[];
    for(let i=0;i<this.dim;i++){
      temp[i]=i;
      this.rooms[i]=[];
      for(let j=0;j<this.dim;j++){
        this.rooms[i][j]=new Room(i,j,'yellow',width/this.dim,false,[]);
      }
    }
    for(let i=0;i<this.dim;i++){
      xs[i]=random(temp);
      ys[i]=random(temp);
      this.rooms[xs[i]][ys[i]].active=true;
    }
  }
  adj1(){
    let xs=[];
    let ys=[];
    let count=0;
    for(let i=0;i<this.dim;i++){
      for(let j=0;j<this.dim;j++){
        if(this.rooms[i][j].active){
          xs[count]=this.rooms[i][j].x;
          ys[count]=this.rooms[i][j].y;
          count++;
        }
      }
    }
    for(let i=0;i<this.dim;i++){
      for(let j=0;j<this.dim;j++){
        if(this.rooms[i][j].active){
          let tmp = int(random(0,count));
          this.rooms[i][j].adjs=this.rooms[xs[tmp]][ys[tmp]];
        }
      }
    }
  }
  p(){
    for(let i=0;i<this.dim;i++){
      for(let j=0;j<this.dim;j++){
        console.log(this.rooms[i][j]);
      }
    }
  }
}

let env = new Env(10);

function setup() {
  createCanvas(600, 600);
  env.init();
  env.adj1();
}

function draw() {
  background('red');
  for(let i=0;i<env.dim;i++){
    for(let j=0;j<env.dim;j++){
      if(env.rooms[i][j].active){
        fill('yellow');
        circle(env.rooms[i][j].x*width/env.dim,env.rooms[i][j].y*width/env.dim,env.rooms[i][j].size);
      }
    }
  }
  for(let i=0;i<env.dim;i++){
    for(let j=0;j<env.dim;j++){
      if(env.rooms[i][j].adjs!=null){
         line(env.rooms[i][j].x*width/env.dim,
           env.rooms[i][j].y*width/env.dim,
           env.rooms[i][j].adjs.x*width/env.dim,
           env.rooms[i][j].adjs.y*width/env.dim);
      }
    }
  }
}