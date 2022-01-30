let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x,y);
     

    }
  
    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor[Math.random() * emptyCells.lenght]];

        console.log(emptyCells);
        if (newCell && this.multiply >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}