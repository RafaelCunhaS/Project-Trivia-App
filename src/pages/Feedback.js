import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MIN_SCORE = 3;

class Feedback extends React.Component {
    buttonPlayAgin = () => {
      const { history } = this.props;
      history.push('/');
    }

    btnRanking = () => {
      const { history } = this.props;
      history.push('/ranking');
    };

    render() {
      const {
        name,
        score,
        gravatarEmail,
        assertions,
      } = this.props;

      const hashEmail = md5(gravatarEmail).toString();
      return (
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="teste"
          />
          <h6 data-testid="header-player-name">{name}</h6>
          <h6 data-testid="header-score">{score}</h6>
          <p data-testid="feedback-text">
            { assertions < MIN_SCORE ? 'Could be better...' : 'Well Done!' }
          </p>
          <span data-testid="feedback-total-score">{score}</span>
          <span data-testid="feedback-total-question">{assertions}</span>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.buttonPlayAgin }
          >
            Play Again
          </button>

          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.btnRanking }
          >
            Ranking
          </button>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
