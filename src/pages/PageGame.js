import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, getUserData } from '../redux/actions';
import Header from '../Components/Header';
import './PageGame.css';

const RANDOM = 0.5;
const dez = 10;
const tres = 3;

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
      score: 0,
      assertions: 0,
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

  handleScore = ({ target: { id, name } }) => {
    const { userData } = this.props;
    const { count } = this.state;
    let valueDifficulty = 0;
    if (id === 'hard') valueDifficulty = tres;
    if (id === 'medium') valueDifficulty = 2;
    if (id === 'easy') valueDifficulty = 1;

    if (name === 'correctAnswer') {
      this.setState((prevState) => ({
        score: prevState.score + dez + count * valueDifficulty,
        assertions: prevState.assertions + 1,
      }), () => {
        const { score, assertions } = this.state;
        userData({ score, assertions });
      });
    }

    // this.addLocacalStorage();
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
    this.handleScore(event);
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

  // addLocacalStorage = () => {
  //   const { score, assertions } = this.state;
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   localStorage.setItem('user', JSON.stringify({ ...user, score }));
  //   // localStorage.setItem('user', JSON.stringify({ ...user, assertions }));
  // }

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
                    id={ questions[index].difficulty }
                    name={
                      button !== correctAnswer[index]
                        ? 'wrongAnswer'
                        : 'correctAnswer'
                    }
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
  userData: (payload) => dispatch(getUserData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGame);

PageGame.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func,
  useData: PropTypes.func,
}.isRequired;
