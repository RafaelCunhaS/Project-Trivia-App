import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  btnRanking = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>

        <h1 data-testid="ranking-title">Ranking page</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.btnRanking }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Ranking;
