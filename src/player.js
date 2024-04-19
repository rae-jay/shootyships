class Player {
    constructor(name, isBot, gameboard) {
        this.name = name;
        this.isBot = isBot;
        this.gameboard = gameboard;
    }

    attemptPlaceShip(length, startCoord, endCoord) {
        if (length) {
            return this.gameboard.attemptPlaceShip(startCoord, endCoord);
        }
        return false;
    }
}

module.exports = { Player };
