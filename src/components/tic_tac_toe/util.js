const util = {
    GameStatus: Object.freeze({
        STARTED: 0,
        ENDED: 1,
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
    getDiagonal(matrix) {
        return matrix.map(
            (row, rowIdx) => row.filter((el, colIdx) => rowIdx === colIdx)[0]
        );
    }
};

export default util;
