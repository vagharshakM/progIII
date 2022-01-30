let LivingCreature = require('./LivingCreature')

module.exports = class Buys extends LivingCreature {
    constructor(x, y) {
    super(x,y);
        

    }
 
    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor[Math.random() * emptyCells.lenght]];

        console.log(emptyCells);
        if (newCell && this.multiply >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newGrass = new buys(newX, newY);
            buysArr.push(newGrass);
            this.multiply = 0;
        }
    }

}