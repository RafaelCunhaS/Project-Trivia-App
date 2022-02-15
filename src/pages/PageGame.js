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
      index: 0,
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
    const { questions, buttons, correctAnswer, index } = this.state;
    const sorted = buttons.map((arr) => arr.sort(() => Math.random() - RANDOM));
    return (
      <main>
        <Header />
        {questions.length > 0
          && (
            <div>
              <p data-testid="question-category">{questions[index].category}</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <div data-testid="answer-options">
                {sorted[index].map((button, i) => (
                  <button
                    data-testid={
                      button !== correctAnswer[index]
                        ? `wrong-answer-${i}`
                        : 'correct-answer'
                    }
                    type="button"
                    key={ i }
                  >
                    {button}
                  </button>))}
              </div>

            </div>)}

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
