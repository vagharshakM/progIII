let LivingCreature = require('./LivingCreature')

module.exports = class BuysEater extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 8;
        this.directions = [];
    }

   

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }

    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor[Math.random() * emptyCells.length]];

        console.log(emptyCells);
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newGrass = new buysEater(newX, newY);
            buysEaterArr.push(newGrass);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            console.log(newCell)
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.x][this.y]
            matrix[this.x][this.y] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = super.chooseCell(4)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in buysArr) {
                if (newX == buysArr[i].x && newY == buysArr[i].y) {
                    buysArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in buysEaterArr) {
            if (this.x == buysEaterArr[i].x && this.y == buysEaterArr[i].y) {
                buysEaterArr.splice(i, 1);
                break;
            }
        }
    }
}