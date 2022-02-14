import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

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

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleClick = () => {
    const { history } = this.props;

    history.push('/settings');
  }

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div>
        <Header />
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Configurações
        </button>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
