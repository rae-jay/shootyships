class BotBrain {
    static placeShips(match) {
        match.shipLengths.forEach((length) => {
            // console.log('length: ' + length);
            // (when i actually implement i want to make generateShipCoords #private again i think)
            tryPlace(length);
        });

        // recursively creates coords, tries to place
        // if placement fails, tries again
        function tryPlace(length) {
            const coords = BotBrain.generateShipCoords(length, match.boardSize);

            // fails if coords already contain a ship
            if (!match.attemptPlaceShip(length, ...coords)) {
                tryPlace(length, match.boardSize);
            }
        }
    }

    // produces random coords based on ship length (does NOT check validity)
    static generateShipCoords(length, boardSize) {
        // not moving both forward and backward feels dirty but i ALSO don't think
        // it actually makes any difference at all??
        // so not doing it unless things feel wonky later...

        let startCoord;
        let endCoord;
        const startpoint = BotBrain.getRandomNum(0, boardSize - length);
        const constNum = BotBrain.getRandomNum(0, boardSize - 1);

        if (BotBrain.getRandomNum(0, 2) == 0) {
            startCoord = [startpoint, constNum];
            endCoord = [startpoint + length - 1, constNum];
        } else {
            startCoord = [constNum, startpoint];
            endCoord = [constNum, startpoint + length - 1];
        }

        //         console.log(`[${testStartCoord[0]},${testStartCoord[1]}]\n
        // [${testEndCoord[0]},${testEndCoord[1]}]`);

        const testResult =
            startCoord[0] >= 0 &&
            startCoord[0] < boardSize &&
            startCoord[1] >= 0 &&
            startCoord[1] < boardSize &&
            endCoord[0] >= 0 &&
            endCoord[0] < boardSize &&
            endCoord[1] >= 0 &&
            endCoord[1] < boardSize;
        if (!testResult) {
            throw new Error(
                'BotBrain.attemptPlace spat out an invalid placement coord'
            );
        }

        return [startCoord, endCoord];
    }

    static getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

module.exports = { BotBrain };
