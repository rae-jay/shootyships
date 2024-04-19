// this exists mostly for test-driver.js
// which is the thing that i'll try to put all the pieces together with,
// before trying to pull them together with like, html and shtuff

// i dont feel like i put thise one here and it's frightening me
// const { experiments } = require('webpack');
const { Match } = require('./test-driver.js');

/*  get two players with names and gameboards
    -  will be two name fields and a computer toggle, information collected on press 'start'
    set up those gameboards with ships
    -  user input will control 'which ship length is selected', and a start/end coordinate
       this coordinate will be VALIDITY CHECKED on click, which will trigger actual ship
       placement in gameboard
       so checkPlace(lengthSelected, [start/end])
    pew pew
*/

test('given two names and bot status, perform game startup', () => {
    const testMatch = new Match(3);
    testMatch.initiatePlayers(['Human', 'Botbert'], true);
    expect(testMatch.players[0].name).toBe('Human');
    expect(testMatch.players[0].isBot).toBe(false);
    expect(testMatch.players[1].name).toBe('Botbert');
    expect(testMatch.players[1].isBot).toBe(true);
});

test('ship placement validity can be checked', () => {
    const testMatch = new Match(3);
    testMatch.initiatePlayers(['Human', 'Botbert'], true);

    expect(testMatch.attemptPlaceShip(2, [0, 0], [1, 0])).toBe(true);
    expect(testMatch.attemptPlaceShip(null, [0, 0], [1, 0])).toBe(false);

    expect(testMatch.attemptPlaceShip(1, [0, 0], [0, 0])).toBe(false);
    expect(testMatch.attemptPlaceShip(1, [1, 0], [1, 0])).toBe(false);

    expect(testMatch.attemptPlaceShip(1, [2, 2], [2, 2])).toBe(true);
});
