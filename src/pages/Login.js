import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validadeBtn);
  }

  validadeBtn = () => {
    const { name, email } = this.state;
    if (name && email) this.setState({ btnDisabled: false });
    else this.setState({ btnDisabled: true });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history, getToken } = this.props;
    const data = await getToken();
    localStorage.setItem('token', data.token);
    history.push('/pagegame');
  }

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="name">
          Nome:
          <input
            id="name"
            type="text"
            name="name"
            onChange={ this.handleChange }
            value={ name }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            name="email"
            onChange={ this.handleChange }
            value={ email }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="submit"
          disabled={ btnDisabled }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()) });

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  getToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
