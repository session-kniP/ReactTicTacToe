import React from 'react';
import TicTacToeContext from './TicTacToeContext';
import util from './util';

const Color = util.Color;

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            row: props.row,
            col: props.col,
        };
    }

    hover(event, color, marked) {
        if (!marked) {
            event.target.style.background = color;

            color === Color.NONE
                ? (event.target.style.opacity = '100%')
                : (event.target.style.opacity = '30%');
        } else {
            event.target.style.opacity = '100%';
        }
    }

    click(event, callback) {
        event.target.style.opacity = '100%';
        callback(this.state.row, this.state.col);
    }

    render() {
        return (
            <TicTacToeContext.field.Consumer>
                {(fieldConsumer) => {
                    const styles = ['cell', fieldConsumer.marker];

                    const marked = fieldConsumer.marker !== util.Symbol.NONE;

                    return (
                        <td
                            className={styles.join(' ')}
                            onMouseOver={(e) =>
                                this.hover(
                                    e,
                                    fieldConsumer.currentColor,
                                    marked
                                )
                            }
                            onMouseLeave={(e) =>
                                this.hover(e, util.Color.NONE, marked)
                            }
                            onClick={(e) =>
                                marked
                                    ? null
                                    : this.click(e, fieldConsumer.markCell)
                            }
                        ></td>
                    );
                }}
            </TicTacToeContext.field.Consumer>
        );
    }
}

export default Cell;
