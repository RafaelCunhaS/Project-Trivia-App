import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  render() {
    const {
      name,
      score,
      gravatarEmail,
    } = this.props;

    const hashEmail = md5(gravatarEmail).toString();
    return (
      <div className="header-container">
        <img
          id="img"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="teste"
        />
        <h5>{`Player: ${name}`}</h5>
        <h5>{`Score: ${score}`}</h5>
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
