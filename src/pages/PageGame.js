/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions';
import Header from '../Components/Header';

const RANDOM = 0.5;

class PageGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      buttons: [],
      correctAnswer: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const RESPOSE_CODE = 3;
    const { token, getToken } = this.props;
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then(async (data) => {
        if (data.response_code === RESPOSE_CODE) {
          await getToken();
          this.getData();
        }
        this.setState({ questions: data.results,
          buttons: data.results.map((obj) => [obj.correct_answer,
            ...obj.incorrect_answers]),
          correctAnswer: data.results.map((obj) => obj.correct_answer),
        });
      });
  }

  render() {
    const { questions, buttons, correctAnswer } = this.state;
    const sorted = buttons.map((arr) => arr.sort(() => Math.random() - RANDOM));
    return (
      <main>
        <Header />
        {questions.map((obj, index) => (
          <div key={ obj.question }>
            <p data-testid="question-category">{obj.category}</p>
            <p data-testid="question-text">{obj.question}</p>
            <div data-testid="answer-options">
              {sorted[index].map((answer, i) => {
                if (answer === correctAnswer[index]) {
                  return (
                    <button
                      key={ answer }
                      type="button"
                      data-testid="correct-answer"
                    >
                      {answer}
                    </button>);
                }
                return (
                  <button
                    key={ answer }
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                  >
                    {answer}
                  </button>);
              })}
            </div>
          </div>
        ))}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGame);

PageGame.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func,
}.isRequired;
