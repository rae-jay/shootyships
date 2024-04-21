const { Ship } = require('./ship.js');

class Gameboard {
    constructor(size) {
        this.ships = [];
        this.grid = [];

        for (let x = 0; x < size; x++) {
            this.grid.push([]);
            for (let y = 0; y < size; y++) {
                this.grid[x].push({ beenHit: false, ship: null });
            }
        }
    }

    // information fetchers
    // uses one coord to find one cell object
    #getCellOb(coords) {
        const [x, y] = coords;
        return this.grid[x][y];
    }

    // uses two coords to find all coords in between
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

        // in case start and end are the same
        if (!dif) {
            // i think this check is redundant and i can just assume that !dif means
            // start and end are the same
            // but this makes me feel better
            if (startCoord[0] == endCoord[0] && startCoord[1] == endCoord[1]) {
                result.push(startCoord);
                return result;
            } else {
                throw new Error(
                    `getCells coordinates had an issue: ${startCoord} / ${endCoord}`
                );
            }
        }

        // for 'difference', find cells in order in correct direction
        for (let i = 0; i <= dif; i++) {
            result.push([
                startCoord[0] + steps[0] * i,
                startCoord[1] + steps[1] * i,
            ]);
        }

        return result;
    }

    // use one coord to find cell-object information
    cellHitCheck(coords) {
        return this.#getCellOb(coords).beenHit;
    }

    // use one coord to find cell-object information
    cellShipCheck(coords) {
        return this.#getCellOb(coords).ship;
    }

    // uses two coords to find MULTIPLE cell-objects' information
    multiCellShipCheck(startCoord, endCoord) {
        let fail = false;
        this.getCells(startCoord, endCoord).forEach((coord) => {
            if (this.cellShipCheck(coord)) {
                fail = true;
            }
        });

        return !fail;
    }

    // just return bool
    allShipsSunk() {
        // this defaulting to true assumes like. there are actually ships.
        let allSunk = true;
        this.ships.forEach((ship) => {
            if (!ship.isSunk()) {
                allSunk = false;
            }
        });
        return allSunk;
    }

    // do-stuffers
    // assigns a ship to ASSUMED VALID coordinates
    placeShip(startCoord, endCoord) {
        const cellCoords = this.getCells(startCoord, endCoord);
        const newShip = new Ship(cellCoords.length);
        this.ships.push(newShip);

        cellCoords.forEach((coord) => {
            this.#getCellOb(coord).ship = newShip;
        });
    }

    // registers a hit on an ASSUMED VALID target
    recieveAttack(coord) {
        this.#getCellOb(coord).beenHit = true;

        const ship = this.cellShipCheck(coord);
        if (ship) {
            ship.hit();
        }
    }
}

/*
    we currently don't check VALIDITY of placement when putting down a ship
    MAYBE placeShip should start with a check, 'are these coordinates valid or blocked'
    and return a false/true for success

    (my hesitation with putting that in now is that placing a ship may involve mouse hovering
    EVENTUALLY, and this COULD lead us to a place where we're checking validity twice over,
    every time the 'selected coordinates' changes (mouse movement)
    and every time ship placement is COMMITED (on click))

    which would imply a SEPERATE function, not directly tied in, that checks validity
    and in user-version, placeShip is only GETTING called when a placement is already known
    as clean

    .
    (recieve attack is similar, it assumes a valid target, and probably should stay that
    way, but will likely need support logic preceeding it)
*/

/*



*/
// for tests
module.exports = { Gameboard };
