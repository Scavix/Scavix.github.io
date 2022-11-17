class Agent{
    constructor(x,y,img,dim){
        this.x = x;
        this.y = y;
        this.img = img;
        this.dim = dim;
    }
    move(dir){
        if(dir == 'up'){
            this.y--;
        }
        if(dir == 'down'){
            this.y++;
        }
        if(dir == 'left'){
            this.x--;
        }
        if(dir == 'right'){
            this.x++;
        }
    }
    show(){
        image(this.img,this.x*this.dim,this.y*this.dim,this.dim,this.dim);
    }
}