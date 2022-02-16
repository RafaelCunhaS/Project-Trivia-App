import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions';
import Header from '../Components/Header';
import './PageGame.css';

const RANDOM = 0.5;

class PageGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      buttons: [],
      correctAnswer: '',
      index: 0,
      correctStyle: {},
      incorrectStyle: {},
      count: 30,
      nextBtn: false,
      btnDisabled: false,
      feedbacks: [],
    };
  }

  componentDidMount() {
    this.getData();
    this.countdown();
  }

  timerCount = () => {
    const { count } = this.state;
    if (count > 0) {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    } else if (count === 0) {
      clearInterval(this.myInterval);
      this.setState({
        correctStyle: { border: '3px solid rgb(6, 240, 15)' },
        incorrectStyle: { border: '3px solid rgb(255, 0, 0)' },
        nextBtn: true,
        btnDisabled: true,
        count: 0,

      });
    }
  }

  countdown = () => {
    const milliSeconds = 1000;
    this.myInterval = setInterval(this.timerCount, milliSeconds);
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
            ...obj.incorrect_answers])
            .map((arr) => arr.sort(() => Math.random() - RANDOM)),
          correctAnswer: data.results.map((obj) => obj.correct_answer),
        });
      });
  }

  handleClick = (event) => {
    event.persist();
    this.setState((prevState) => ({ correctStyle: { border: '3px solid rgb(6, 240, 15)' },
      incorrectStyle: { border: '3px solid rgb(255, 0, 0)' },
      nextBtn: true,
      btnDisabled: true,
      count: 0,
      feedbacks: [...prevState.feedbacks, event.target.innerHTML]
      ,
    }));
    console.log(event.target.innerHTML);
  }

  handleNext = () => {
    const MAX_LENGTH = 4;
    const { index } = this.state;
    this.setState((prevState) => ({ index: prevState.index + 1,
      correctStyle: {},
      incorrectStyle: {},
      btnDisabled: false,
      count: 30,
    }));

    if (index === MAX_LENGTH) {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  render() {
    const { questions, buttons, correctAnswer, index,
      correctStyle, incorrectStyle, count, nextBtn, btnDisabled } = this.state;
    return (
      <main>
        <Header />
        {questions.length > 0
          && (
            <div>
              <p data-testid="question-category">{questions[index].category}</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <div className="buttons" data-testid="answer-options">
                {buttons[index].map((button, i) => (
                  <button
                    data-testid={
                      button !== correctAnswer[index]
                        ? `wrong-answer-${i}`
                        : 'correct-answer'
                    }
                    style={ button === correctAnswer[index]
                      ? correctStyle : incorrectStyle }
                    type="button"
                    key={ button }
                    onClick={ this.handleClick }
                    disabled={ btnDisabled }
                  >
                    {button}
                  </button>))}
              </div>
            </div>)}
        <div>
          <h1>
            Timer:
            {' '}
            {count}
          </h1>
        </div>
        {nextBtn && (
          <button
            type="button"
            onClick={ this.handleNext }
            data-testid="btn-next"
          >
            Next
          </button>)}
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
