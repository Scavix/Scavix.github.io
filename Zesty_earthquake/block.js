class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        square(this.x, this.y, sectionsSize);
    }
    move(thisDir) {
        this.y += sectionsSize;
        this.x += (thisDir*sectionsSize);
        return this.y;
    }
}