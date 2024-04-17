const { workTest } = require('./ship.js');

test('plugged in', () => {
    expect(workTest()).toBe('yes');
})