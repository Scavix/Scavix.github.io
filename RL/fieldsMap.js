class FieldsMap {
    constructor(grid, img, dim) {
        this.grid = grid;
        this.img = img;
        this.fields = [];
        this.dim = dim;
        this.init();
    }
    init() {
        for (let i = 0; i < this.grid; i++) {
            this.fields[i] = [];
            for (let j = 0; j < this.grid; j++) {
                this.fields[i].push(new Field(true));
            }
        }
        for (let i = 0; i < this.grid; i++) {
            for (let j = 0; j < this.grid; j++) {
                if (i == 0 || i == this.fields.length - 1 || j == 0 || j == this.fields[i].length - 1 || i == 5 || j == 5 || i == 4 || j == 4) {
                    this.fields[i][j].visible = false;
                }
            }
        }
    }
    show() {
        for (let i = 0; i < this.grid; i++) {
            for (let j = 0; j < this.grid; j++) {
                if (this.fields[i][j].visible) {
                    image(this.img, i * this.dim, j * this.dim, this.dim, this.dim);
                }
            }
        }
    }
    getField(x, y) {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].x == x && this.fields[i].y == y) {
                return this.fields[i];
            }
        }
    }
    checkMove(x, y, dir) {
        let newX = x;
        let newY = y;
        if (dir == 'up') {
            newY--;
        }
        if (dir == 'down') {
            newY++;
        }
        if (dir == 'left') {
            newX--;
        }
        if (dir == 'right') {
            newX++;
        }
        if (newX < 0 || newX > this.grid - 1 || newY < 0 || newY > this.grid - 1) {
            return false;
        }
        if (this.fields[newX][newY].visible) {
            return false;
        }
        return true;
    }
}