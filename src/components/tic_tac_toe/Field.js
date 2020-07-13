import React from 'react';
import Cell from './Cell';
import '../../styles/TicTacToe.css';
import TicTacToeContext from './TicTacToeContext';
import util from './util';

const Symbol = util.Symbol;
const Color = util.Color;

class Field extends React.Component {
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
                    marker: util.Symbol.NONE,
                    comp: <Cell key={Math.random()} row={i} col={j} />,
                });
            }
            cells.push(row);
        }

        this.state = {
            cells: cells,
            currentSymbol: util.Symbol.X,
        };
    }

    markCell(row, col) {
        if (this.state.cells[row][col].marker === util.Symbol.NONE) {
            // const tempArr = JSON.parse(JSON.stringify(this.state.cells));
            const tempArr = this.state.cells.slice(0);

            tempArr[row][col].marker = this.state.currentSymbol;

            const newSymbol = this.switchCurrentSymbol();
            this.setState({ cells: tempArr, currentSymbol: newSymbol });
            this.processGameState();
        }
    }

    switchCurrentSymbol() {
        return this.state.currentSymbol === Symbol.X ? Symbol.O : Symbol.X;
    }

    processGameState() {
        if (this.checkRows() || this.checkCols() || this.checkDiags()) {
            console.log('WIN!!!');
            return true;
        }
        return false;
    }

    checkRows() {
        for (let row = 0; row < this.state.cells.length; row++) {
            let current = this.state.cells[row][0].marker;
            for (let pos = 1; pos < this.state.cells[row].length; pos++) {
                if (this.state.cells[row][pos].marker !== current) {
                    console.log(row, pos, current, this.state.cells[row][pos].marker);
                    return false;
                    
                }
            }
        }
    }

    checkCols() {
        for (let col = 0; col < this.state.cells[0].length; col++) {
            for(let pos = 1; pos < this.state.cells.length; pos++) {
                let current = this.state.cells[pos][col].marker;
                if (this.state.cells[pos][col].marker !== current) {
                    return false;
                }
            }
        }
    }

    checkDiags() {

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
