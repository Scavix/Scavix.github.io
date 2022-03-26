class Enemy{
  constructor(x,y,len,val,img){
    this.x=x;
    this.y=y;
    this.len=len;
    this.val=val;
    this.img=img;
  }
  setVal(val){
    this.val=val;
  }
  getVal(){
    return this.val;
  }
  drawMe(){
    if(this.val){
       image(
        this.img,
        this.x - this.len / 2,
        this.y - this.len / 2,
        this.len,
        this.len
      );
    }
  }
}