const { Ship } = require('./ship.js');
const { Gameboard } = require('./gameboard.js');
const { Player } = require('./player.js');
//

//Ships
test('create ship object', () => {
    expect(new Ship(3)).toHaveProperty('length', 3);
    expect(new Ship(2)).toHaveProperty('length', 2);

    const testShip1 = new Ship(2);
    const testShip2 = new Ship(4);
    expect(testShip1).toHaveProperty('hits', 0);
    expect(testShip2).toHaveProperty('hits', 0);
    expect(testShip1).toHaveProperty('sunk', false);
    expect(testShip2).toHaveProperty('sunk', false);
});

test('ship can be hit', () => {
    const testShip1 = new Ship(2);
    testShip1.hit();
    expect(testShip1).toHaveProperty('hits', 1);
    testShip1.hit();
    expect(testShip1).toHaveProperty('hits', 2);
});

test("ship can tell when it's sunk", () => {
    const testShip1 = new Ship(2);
    testShip1.hit();
    expect(testShip1.isSunk()).toBe(false);
    testShip1.hit();
    expect(testShip1.isSunk()).toBe(true);
});
/*

*/
// gameboards
test('gameboard is generated', () => {
    expect(new Gameboard(3).grid.length).toBe(3);
});

test('gameboard can fetch cells', () => {
    const testBoard = new Gameboard(3);
    // vertical increasing (length 2)
    expect(testBoard.getCells([0, 0], [0, 1])).toEqual([
        [0, 0],
        [0, 1],
    ]);
    // horizontal increasing (length 2)
    expect(testBoard.getCells([1, 1], [2, 1])).toEqual([
        [1, 1],
        [2, 1],
    ]);
    // horizontal decreasing (length 3)
    expect(testBoard.getCells([2, 2], [0, 2])).toEqual([
        [2, 2],
        [1, 2],
        [0, 2],
    ]);
    // vertical decreasing (length 2)
    expect(testBoard.getCells([1, 2], [1, 1])).toEqual([
        [1, 2],
        [1, 1],
    ]);
});

// test structure/general life decisions be gettin REAL HAZY IM SORRY
test('gameboard can place ships', () => {
    const testBoard = new Gameboard(3);
    testBoard.placeShip([0, 0], [0, 1]);
    expect(testBoard.cellShipCheck([0, 1])).toHaveProperty('length', 2);

    testBoard.placeShip([2, 2], [0, 2]);
    expect(testBoard.cellShipCheck([1, 2])).toHaveProperty('length', 3);

    expect(testBoard.cellShipCheck([1, 1])).toBeNull();

    testBoard.placeShip([1, 1], [1, 1]);
    expect(testBoard.cellShipCheck([1, 1])).toHaveProperty('length', 1);
});

test('gameboard can recieve attacks', () => {
    const testBoard = new Gameboard(3);
    expect(testBoard.cellHitCheck([1, 1])).toBe(false);
    testBoard.recieveAttack([1, 1]);
    expect(testBoard.cellHitCheck([1, 1])).toBe(true);
});

test('gameboard attacks will actually hit a ship', () => {
    const testBoard = new Gameboard(3);
    testBoard.placeShip([0, 0], [0, 1]);
    expect(testBoard.cellShipCheck([0, 0])).toHaveProperty('hits', 0);
    testBoard.recieveAttack([0, 0]);
    expect(testBoard.cellShipCheck([0, 0])).toHaveProperty('hits', 1);
});

test('gameboard can tell when all its ships are sunk', () => {
    const testBoard = new Gameboard(3);
    testBoard.placeShip([0, 0], [0, 0]);
    expect(testBoard.allShipsSunk()).toBe(false);

    testBoard.placeShip([2, 2], [2, 2]);
    testBoard.recieveAttack([0, 0]);
    expect(testBoard.allShipsSunk()).toBe(false);
    testBoard.recieveAttack([2, 2]);
    expect(testBoard.allShipsSunk()).toBe(true);
});
/*

*/
//player
test('create basic player with name and board', () => {
    const testPerson = new Player('human');
    expect(testPerson).toHaveProperty('name', 'human');
    expect(testPerson).toHaveProperty('gameboard');
});
