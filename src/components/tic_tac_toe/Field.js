import React from 'react';
import Cell from './Cell';
import '../../styles/TicTacToe.css';
import TicTacToeContext from './TicTacToeContext';
import util from './util';

const Symbol = util.Symbol;
const Color = util.Color;

class Field extends React.Component {
    static contextType = TicTacToeContext.app;

    constructor(props) {
        super(props);

        const cells = [];

        this.markCell = this.markCell.bind(this);
        this.switchCurrentSymbol = this.switchCurrentSymbol.bind(this);
        this.processGameState = this.processGameState.bind(this);
        this.checkRows = this.checkRows.bind(this);
        this.checkCols = this.checkCols.bind(this);
        this.checkDiags = this.checkDiags.bind(this);

        for (let i = 0; i < 3; i++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push({
                    marker: Symbol.NONE,
                    comp: <Cell key={Math.random()} row={i} col={j} />,
                });
            }
            cells.push(row);
        }

        this.state = {
            cells: cells,
            currentSymbol: Symbol.X,
        };
    }

    markCell(row, col) {
        if (this.state.cells[row][col].marker === Symbol.NONE) {
            // const tempArr = JSON.parse(JSON.stringify(this.state.cells));
            const tempArr = this.state.cells.slice(0);

            tempArr[row][col].marker = this.state.currentSymbol;

            const newSymbol = this.switchCurrentSymbol();
            this.setState({ cells: tempArr, currentSymbol: newSymbol });
            if (this.processGameState()) {
                this.context.endGame(this.state.currentSymbol);
            }
        }
    }

    switchCurrentSymbol() {
        return this.state.currentSymbol === Symbol.X ? Symbol.O : Symbol.X;
    }

    processGameState() {
        if (this.checkRows() || this.checkCols() || this.checkDiags()) {
            return true;
        }
        return false;
    }

    checkRows() {
        for (let row = 0; row < this.state.cells.length; row++) {
            const currentRow = this.state.cells[row];
            if (
                currentRow.filter(
                    (e) =>
                        e.marker === currentRow[0].marker &&
                        e.marker !== Symbol.NONE
                ).length === currentRow.length
            ) {
                return true;
            }
        }
        return false;
    }

    checkCols() {
        for (let col = 0; col < this.state.cells.length; col++) {
            const currentCol = this.state.cells.map((row) => row[col]);

            if (
                currentCol.filter(
                    (e) =>
                        e.marker === currentCol[0].marker &&
                        e.marker !== Symbol.NONE
                ).length === currentCol.length
            ) {
                return true;
            }
        }
        return false;
    }

    checkDiags() {
        let cells = this.state.cells;
        //major diagonal
        let diagonal = util.getDiagonal(cells);

        console.log(diagonal);

        if (
            diagonal.filter(
                (el) =>
                    el.marker === diagonal[0].marker &&
                    el.marker !== Symbol.NONE
            ).length === diagonal.length
        ) {
            return true;
        }

        //minor diagonal
        cells = cells.reverse();
        diagonal = util.getDiagonal(cells);

        if (
            diagonal.filter(
                (el) =>
                    el.marker === diagonal[0].marker &&
                    el.marker !== Symbol.NONE
            ).length === diagonal.length
        ) {
            return true;
        }

        return false;
    }

    render() {
        console.log('Current symbol is ', this.state.currentSymbol);
        return (
            <table className="field">
                {this.state.cells.map((r) => {
                    return (
                        <tbody key={Math.random()}>
                            <tr key={Math.random()}>
                                {r.map((el) => {
                                    return (
                                        <TicTacToeContext.field.Provider
                                            key={Math.random()}
                                            value={{
                                                markCell: this.markCell,
                                                currentColor:
                                                    this.state.currentSymbol ===
                                                    Symbol.X
                                                        ? Color.BLUE
                                                        : Color.RED,
                                                marker: el.marker,
                                            }}
                                        >
                                            <>{el.comp}</>
                                        </TicTacToeContext.field.Provider>
                                    );
                                })}
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        );
    }
}

export default Field;
