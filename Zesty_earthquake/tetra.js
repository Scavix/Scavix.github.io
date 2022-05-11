class Tetra {
    constructor(blocks) {
        this.blocks = blocks;
        this.color = this.randomColor();
        this.tmp;
        this.i;
    }
    show() {
        for (this.i = 0; this.i < this.blocks.length; this.i++) {
            fill(this.color);
            this.blocks[this.i].show();
        }
    }
    move(thisDir) {
        for (this.i = 0; this.i < this.blocks.length; this.i++) {
            this.tmp = this.blocks[this.i].move(thisDir);
            if (this.tmp + sectionsSize >= height) {
                sentinel = true;
            }
        }
        return sentinel;
    }
    randomColor() {
        return color(random(255), random(255), random(255));
    }
}