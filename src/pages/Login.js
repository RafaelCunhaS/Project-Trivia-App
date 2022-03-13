import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, getData, getUserData } from '../redux/actions';
import './Login.css';
import Logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
  }

  componentDidMount() {
    const { userData } = this.props;
    userData({ score: 0, name: '' });
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
    dispatchSetValue({ name, email });
    const data = await getToken();
    localStorage.setItem('token', data.token);
    history.push('/pagegame');
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div className="container">
        <img src={ Logo } alt="Trivia" width="350rem" />
        <form onSubmit={ this.handleSubmit } className="form-container">
          <label htmlFor="name" className="login-input">
            Name:
            <input
              id="name"
              type="text"
              name="name"
              onChange={ this.handleChange }
              value={ name }
              data-testid="input-player-name"
              className="inputs"
            />
          </label>
          <label htmlFor="email" className="login-input">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="input-gravatar-email"
              className="inputs"
            />
          </label>
          <button
            type="submit"
            disabled={ btnDisabled }
            className="btns"
          >
            Play
          </button>
        </form>
        <button
          type="button"
          onClick={ this.handleClick }
          className="btns"
        >
          Settings
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (data) => dispatch(getData(data)),
  getToken: () => dispatch(fetchToken()),
  userData: (payload) => dispatch(getUserData(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  getToken: PropTypes.func.isRequired,
  dispatchSetValue: PropTypes.func.isRequired,
  userData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
