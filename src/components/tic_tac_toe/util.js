const util = {
    GameStatus: Object.freeze({
        READY: 0,
        STARTED: 1,
    }),
    Symbol: Object.freeze({
        X: 'x',
        O: 'o',
        NONE: ''
    }),
    Color: Object.freeze({
        RED: 'red',
        GREEN: 'green',
        BLUE: 'blue',
        NONE: 'none',

        fromRgb(r, g, b, a = 1.0) {
            return `rgb(${r}, ${g}, ${b}, ${a})`;
        },
    }),
};

export default util;
