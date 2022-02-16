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

    render() {
      const {
        name,
        score,
        gravatarEmail,
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
            { score < MIN_SCORE ? 'Could be better...' : 'Well Done!' }
          </p>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.buttonPlayAgin }
          >
            Play Again
          </button>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,

};

export default connect(mapStateToProps)(Feedback);
