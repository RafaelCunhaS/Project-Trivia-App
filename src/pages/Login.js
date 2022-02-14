import React from 'react';

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

export default Login;
