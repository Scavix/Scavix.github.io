class Reward {
    constructor(x,y,img,dim) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.dim = dim;
    }
    show() {
        image(this.img,this.x*this.dim,this.y*this.dim,this.dim,this.dim);
    }
}