//
function workTest() {
    console.log('am working');
}
workTest();

//
class Ship {
    constructor(length) {
        this.length = length;

        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits += 1;
        // is this where 'isSunk()' should be triggered?
    }

    isSunk() {
        if (this.hits >= this.length) return true;
        return false;
    }
}

/*
 


im so deeply sorry for all these comments but Prettier's 'no more than one blank line'
rule is going to give me a gd headache i simply cannot read things that close together
*/
// for tests
module.exports = { Ship };
