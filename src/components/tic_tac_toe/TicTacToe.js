import React from 'react';
import Field from './Field';
import TicTacToeContext from './TicTacToeContext';
import '../../styles/TicTacToe.css';
import util from './util';
import PropTypes from 'prop-types';

const GameStatus = util.GameStatus;

class TicTacToe extends React.Component {
    constructor(props) {
        super(props);

        this.endGame = this.endGame.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

        this.state = {
            gameStatus: GameStatus.STARTED,
        };
    }

    changeStatus(status) {
        this.setState({ gameStatus: status });
    }

    endGame(symbol) {
        this.changeStatus(GameStatus.ENDED);
        alert(`${symbol} WINS!!!`);
    }

    render() {
        return (
            <TicTacToeContext.app.Provider value={{endGame: this.endGame}}>
                <div className="title"></div>
                <Field key={Math.random()} siz={'Saizik'} />
            </TicTacToeContext.app.Provider>
        );
    }
}

TicTacToe.propTypes = {
    status: PropTypes.objectOf(GameStatus),
};

export default TicTacToe;
