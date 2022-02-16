import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
//   componentDidMount() {

  //   }

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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Header);
