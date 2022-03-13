import React from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../Services/localStorage';
import './Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      arrayScore: [],
    };
  }

  componentDidMount() {
    const data = getRanking();
    this.scoreMount(data);
  }

  scoreMount = (data) => this.setState({ arrayScore: data });

  btnRanking = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { arrayScore } = this.state;
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking page</h1>
        <button
          type="button"
          onClick={ this.btnRanking }
          className="btns"
        >
          Home
        </button>
        <section className="players">
          {arrayScore.map((player, index) => (
            <div key={ player.name } className="player">
              <img alt="foto-player" src={ player.picture } />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>))}
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Ranking;
