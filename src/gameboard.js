const { Ship } = require('./ship.js');

class Gameboard {
    constructor(size) {
        this.grid = [];

        for (let x = 0; x < size; x++) {
            this.grid.push([]);
            for (let y = 0; y < size; y++) {
                this.grid[x].push({ beenHit: false, ship: null });
            }
        }
    }

    #getCellOb(coords) {
        const [x, y] = coords;
        return this.grid[x][y];
    }

    getCells(startCoord, endCoord) {
        const result = [];

        // determine whether startCoord numbers need to increase or decrease
        // (or stay the same, depending on which axis is changing)
        // and how many times the loop needs to iterate
        let steps = [0, 0];
        let dif;
        for (const axis in startCoord) {
            if (startCoord[axis] != endCoord[axis]) {
                dif = Math.abs(startCoord[axis] - endCoord[axis]);

                if (startCoord[axis] < endCoord[axis]) {
                    steps[axis] = 1;
                } else {
                    steps[axis] = -1;
                }
                break;
            }
        }
        // i don't know that this is necessary but it makes me feel better
        if (!dif) {
            throw new Error(
                `getCells coordinates had an issue: ${startCoord} / ${endCoord}`
            );
        }

        for (let i = 0; i <= dif; i++) {
            result.push([
                startCoord[0] + steps[0] * i,
                startCoord[1] + steps[1] * i,
            ]);
        }

        return result;
    }

    placeShip(startCoord, endCoord) {
        const cellCoords = this.getCells(startCoord, endCoord);
        const newShip = new Ship(cellCoords.length);

        cellCoords.forEach((coord) => {
            this.#getCellOb(coord).ship = newShip;
        });
    }

    cellHitCheck(coords) {
        return this.#getCellOb(coords).beenHit;
    }

    cellShipCheck(coords) {
        return this.#getCellOb(coords).ship;
    }
}

/*



*/
// for tests
module.exports = { Gameboard };
