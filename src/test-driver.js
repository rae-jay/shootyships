const { Ship } = require('./ship.js');
const { Gameboard } = require('./gameboard.js');
const { Player } = require('./player.js');

class Match {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.players = [];
        this.currentPlayer;
    }

    // an array of 2 strings and a bool
    initiatePlayers(playerNames, againstBot) {
        const botToggles = [false, againstBot];

        for (const p in playerNames) {
            this.players.push(
                new Player(
                    playerNames[p],
                    botToggles[p],
                    new Gameboard(this.boardSize)
                )
            );
        }

        this.currentPlayer = this.players[0];
    }

    attemptPlaceShip(length, startCoord, endCoord) {
        // DONT LOVE THIS HANDOFFING
        return this.currentPlayer.attemptPlaceShip(
            length,
            startCoord,
            endCoord
        );
    }
}

module.exports = { Match };
