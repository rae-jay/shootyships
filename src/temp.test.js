// this exists mostly for test-driver.js
// which is the thing that i'll try to put all the pieces together with,
// before trying to pull them together with like, html and shtuff

// i dont feel like i put thise one here and it's frightening me
// const { experiments } = require('webpack');
const { Match } = require('./test-driver.js');
const { BotBrain } = require('./bot-logic.js');

/*  get two players with names and gameboards
    -  will be two name fields and a computer toggle, information collected on press 'start'
    set up those gameboards with ships
    -  user input will control 'which ship length is selected', and a start/end coordinate
       this coordinate will be VALIDITY CHECKED on click, which will trigger actual ship
       placement in gameboard
       so checkPlace(lengthSelected, [start/end])
    pew pew


    test-driver/driver in general is also what, at the start of a turn
    IF currentPlayer is not a bot, do UI stuff
    if currentPlayer IS a bot... botlogic has to drive the ui stuff
    so uh. how.
    the bot has to be able to: 
    -   generate random coordinates of appropriate lengths for as long as is necessary to
        fill a board (since it will sometimes fail)

        in a Human, two coords and a length will be based to Match.attemptPS()

        so when Match starts a place-ships phase, sees that the currentPlayer ISNT human
        it has a list of shipLengths, and for each of them, needs to successfully place
        a ship

        so maybe pass the shipLength array into bot-logic, and the match itself
        and botLogic will try match.attempPlace until it runs out of ships?
*/

test('given two names and bot status, perform game startup', () => {
    const testMatch = new Match(3, [2, 1]);
    testMatch.initiatePlayers(['Human', 'Botbert'], true);
    expect(testMatch.players[0].name).toBe('Human');
    expect(testMatch.players[0].isBot).toBe(false);
    expect(testMatch.players[1].name).toBe('Botbert');
    expect(testMatch.players[1].isBot).toBe(true);
});

test('ship placement validity can be checked and ships placed', () => {
    const testMatch = new Match(3, [2, 1]);
    testMatch.initiatePlayers(['Human', 'Botbert'], true);

    expect(testMatch.attemptPlaceShip(2, [0, 0], [1, 0])).toBe(true);
    expect(testMatch.attemptPlaceShip(null, [0, 0], [1, 0])).toBe(false);

    // these coords are now blocked by first successfully placed ship
    expect(testMatch.attemptPlaceShip(1, [0, 0], [0, 0])).toBe(false);
    expect(testMatch.attemptPlaceShip(1, [1, 0], [1, 0])).toBe(false);
    expect(testMatch.attemptPlaceShip(2, [1, 0], [2, 0])).toBe(false);

    expect(testMatch.attemptPlaceShip(1, [2, 2], [2, 2])).toBe(true);
});
/*

*/
//testing botBrain specifically
test('bot can place ships', () => {
    // this would be triggered by Match itself when all plugged in
    // (and therefore would be running on the correct currentPlayer also)

    const testMatch = new Match(3, [2, 1]);
    testMatch.initiatePlayers(['Human', 'Botbert'], true);
    BotBrain.placeShips(testMatch);

    expect(testMatch.players[0].gameboard.ships.length).toBe(2);
    // console.log(testMatch.players[0].gameboard.grid);
});
