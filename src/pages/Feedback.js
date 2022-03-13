import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { resetInfo, getUserData } from '../redux/actions';
import './Feedback.css';

const MIN_SCORE = 3;

class Feedback extends React.Component {
    buttonPlayAgin = () => {
      const { history, updateData, updateGame, score } = this.props;
      updateData(score);
      updateGame();
      history.push('/');
    }

    btnRanking = () => {
      const { history } = this.props;
      history.push('/ranking');
    };

    render() {
      const { score, assertions } = this.props;
      return (
        <div className="container">
          <Header />
          <span className="feedback">
            { assertions < MIN_SCORE ? 'Could be better...' : 'Well Done!' }
          </span>
          <span className="feedback">{`Score: ${score}`}</span>
          <span className="feedback">{`Correct answers: ${assertions}`}</span>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.buttonPlayAgin }
            className="btns"
          >
            Play Again
          </button>

          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.btnRanking }
            className="btns"
          >
            Ranking
          </button>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (payload) => dispatch(getUserData(payload)),
  updateGame: () => dispatch(resetInfo()),
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  assertions: PropTypes.number.isRequired,
  updateData: PropTypes.func.isRequired,
  updateGame: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
