class Player {
    constructor(name, isBot, gameboard) {
        this.name = name;
        this.isBot = isBot;
        this.gameboard = gameboard;
    }

    // attemptPlaceShip(startCoord, endCoord) {
    //     return this.gameboard.attemptPlaceShip(startCoord, endCoord);
    // }
}

module.exports = { Player };
