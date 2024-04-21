const { Ship } = require('./ship.js');
const { Gameboard } = require('./gameboard.js');
const { Player } = require('./player.js');
const { BotBrain } = require('./bot-logic.js');

class Match {
    constructor(boardSize, shipLengths) {
        this.boardSize = boardSize;
        this.shipLengths = shipLengths;

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
        // reaching through currentplayer to gameboard instead of letting cP manage
        // its own board feels dirty
        // however having an attemptPlace function in player that literally just passes
        // information one step forward and changes it not at all ALSO feels dirty
        //so i'm deciding that 'player' is just a a box that the match can reach into to
        // access the correct boards/ships, but generally doesn't drive the car itself

        // this fails if !length OR if coords already contain a ship
        if (length) {
            if (
                this.currentPlayer.gameboard.multiCellShipCheck(
                    startCoord,
                    endCoord
                )
            ) {
                this.currentPlayer.gameboard.placeShip(startCoord, endCoord);
                return true;
            }
        }
        return false;
    }
}

module.exports = { Match };
