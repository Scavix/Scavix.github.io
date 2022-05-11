class Game {
    constructor() {
        this.tetra = this.generateTetra();
        this.field = [];
        this.tmp;
        this.fieldIterator;
        this.fieldBlocksIterator;
        this.tetraBlocksIterator;
        this.i;
    }
    move(thisDir) {
        if (this.tetra.move(thisDir) || this.checkOverlap()) {
            this.field.push((Object.assign(new Tetra(), this.tetra)));
            this.tetra = this.generateTetra();
            sentinel = false;
        }
        dir = 0;
    }
    show() {
        this.tetra.show();
        for (this.i = 0; this.i < this.field.length; this.i++) {
            this.field[this.i].show();
        }
    }
    generateTetra() {
        this.shape = random(['I', 'L', 'W', 'Q', 'S']);
        switch (this.shape) {
            case 'I':
                this.tmp = floor(random(numOfSections - 3));
                return new Tetra([new Block(this.tmp * (width / numOfSections), -sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections) + 2 * sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections) + 3 * sectionsSize, -sectionsSize)]);
            case 'L':
                this.tmp = floor(random(numOfSections - 2));
                return new Tetra([new Block(this.tmp * (width / numOfSections), -sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections) + 2 * sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections), -2 * sectionsSize)]);
            case 'W':
                this.tmp = floor(random(numOfSections - 2));
                return new Tetra([new Block(this.tmp * (width / numOfSections), -sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections) + 2 * sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -2 * sectionsSize)]);
            case 'Q':
                this.tmp = floor(random(numOfSections - 1));
                return new Tetra([new Block(this.tmp * (width / numOfSections), -sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections), -2*sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -2*sectionsSize)]);
            case 'S':
                this.tmp = floor(random(numOfSections - 2));
                return new Tetra([new Block(this.tmp * (width / numOfSections), -sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -sectionsSize), new Block(this.tmp * (width / numOfSections) + sectionsSize, -2*sectionsSize), new Block(this.tmp * (width / numOfSections) + 2*sectionsSize, -72 * sectionsSize)]);
            default:
                Console.log('Error');
        }
    }
    checkOverlap() {
        for (this.tetraBlocksIterator = 0; this.tetraBlocksIterator < this.tetra.blocks.length; this.tetraBlocksIterator++) {
            for (this.fieldIterator = 0; this.fieldIterator < this.field.length; this.fieldIterator++) {
                for (this.fieldBlocksIterator = 0; this.fieldBlocksIterator < this.field[this.fieldIterator].blocks.length; this.fieldBlocksIterator++) {
                    if (this.tetra.blocks[this.tetraBlocksIterator].x == this.field[this.fieldIterator].blocks[this.fieldBlocksIterator].x && this.tetra.blocks[this.tetraBlocksIterator].y + sectionsSize == this.field[this.fieldIterator].blocks[this.fieldBlocksIterator].y) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    checkFinish() {
        for (this.fieldIterator = 0; this.fieldIterator < this.field.length; this.fieldIterator++) {
            for (this.fieldBlocksIterator = 0; this.fieldBlocksIterator < this.field[this.fieldIterator].blocks.length; this.fieldBlocksIterator++) {
                if (this.field[this.fieldIterator].blocks[this.fieldBlocksIterator].y == 0) {
                    return true;
                }
            }
        }
        return false;
    }
}