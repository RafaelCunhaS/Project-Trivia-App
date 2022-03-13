import React from 'react';
import PropTypes from 'prop-types';
import { getConfig, updateConfig } from '../Services/localStorage';
import './Settings.css';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      difficulty: '',
      type: '',
      categoryArray: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.setConfig();
  }

  fetchCategories = () => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => this.setState({ categoryArray: data.trivia_categories }))
      .catch((error) => console.error(error));
  }

  setConfig = async () => {
    const config = await getConfig();
    this.setState({
      category: config.category,
      difficulty: config.difficulty,
      type: config.type });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  saveConfig = () => {
    const { category, difficulty, type } = this.state;
    updateConfig({ category, difficulty, type });
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { category, difficulty, type, categoryArray } = this.state;
    const { history } = this.props;
    return (
      <main className="container">
        <h1 id="settings-title">Game Settings</h1>
        <form className="form-container">
          <label htmlFor="category" className="settings-label">
            Category:
            <select
              id="category"
              name="category"
              onChange={ this.handleChange }
              value={ category }
              className="settings-select"
            >
              <option defaultValue>All</option>
              {categoryArray.map((value) => (
                <option key={ value.id } value={ value.id }>{value.name}</option>))}
            </select>
          </label>
          <label htmlFor="difficulty" className="settings-label">
            Difficulty:
            <select
              id="difficulty"
              name="difficulty"
              onChange={ this.handleChange }
              value={ difficulty }
              className="settings-select"
            >
              <option>All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type" className="settings-label">
            Type of Question:
            <select
              id="type"
              name="type"
              onChange={ this.handleChange }
              value={ type }
              className="settings-select"
            >
              <option defaultValue>All</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True or False</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          className="btns"
          onClick={ () => history.push('/') }
        >
          Go Back
        </button>
        <button type="button" className="btns" onClick={ this.saveConfig }>Save</button>
      </main>
    );
  }
}

export default Settings;

Settings.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
