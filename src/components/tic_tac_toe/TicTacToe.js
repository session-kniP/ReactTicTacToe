import React from 'react';
import Field from './Field';
import TicTacToeContext from './TicTacToeContext';
import '../../styles/TicTacToe.css';
import util from './util';
import PropTypes, { objectOf } from 'prop-types';

const GameStatus = util.GameStatus;

class TicTacToe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameStatus: GameStatus.READY,
        };
    }

    changeStatus(status) {
        this.setState({ gameStatus: status });
    }

    render() {
        return (
            <div>
                <div className="title"></div>
                <Field key={Math.random()} siz={'Saizik'} />
            </div>
        );
    }
}

TicTacToe.propTypes = {
    status: objectOf(GameStatus),
};

export default TicTacToe;
