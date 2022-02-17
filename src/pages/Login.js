import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { fetchToken, getData } from '../redux/actions';

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
    const { name, email } = this.state;

    event.preventDefault();
    const { history, getToken, dispatchSetValue } = this.props;
    const data = await getToken();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ name, email }));
    history.push('/pagegame');
    dispatchSetValue({ name, email });
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

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (data) => dispatch(getData(data)),
  getToken: () => dispatch(fetchToken()) });

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  getToken: PropTypes.func.isRequired,
  dispatchSetValue: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
