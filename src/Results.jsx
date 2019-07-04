import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  background-color: #f2f2f2;
  height: 100%;
`;

const ResultsCard = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 5px;
  width: 65%;
  margin: 2%;
  box-shadow: 0 0 5px 2px lightgrey;
  text-align: center;

  & > .title {
    font-size: xx-large;
    background-color: #262626;
    color: white;
    font-weight: 900;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 10px;
  }

  & > .successRate {
    font-size: xx-large;
    margin: 2%;
    font-weight: 900;
  }

  & > .question {
    text-align: left;
    margin: 2%;
    margin-top: 5%;
    font-size: larger;
    font-weight: 900;
  }

  & > .answer {
    text-align: left;
    margin: 2%;
  }

  & > .userAnswer {
    text-align: left;
    margin: 2%;
  }

  & > .button {
    height: 50px;
  }

  & > .button > .playAgain {
    background-color: dodgerblue;
    color: white;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
  }
`;

class Results extends Component {
  handlePlayAgain = () => {
    this.props.dispatch({ type: 'goHome' });
  };
  render() {
    const deckPlayed = this.props.decks.find(
      deck => deck.id === this.props.deckId
    );
    const answersQuantity = deckPlayed.cards.length;
    let correctAnswers = 0;
    for (let i = 0; i < answersQuantity; i++) {
      if (
        deckPlayed.cards[i].choices[deckPlayed.cards[i].answer] ===
        deckPlayed.cards[i].choices[this.props.answers[i].answer]
      ) {
        correctAnswers++;
      }
    }
    const successCalc = (correctAnswers / answersQuantity) * 100;
    let successRate;
    if (successCalc === 0) {
      successRate = (
        <div className='successRate'>Does not get it at all 😞</div>
      );
    } else if (successCalc < 25) {
      successRate = (
        <div className='successRate'>Potential to get it one day 🤔</div>
      );
    } else if (successCalc < 50) {
      successRate = <div className='successRate'>Kind of gets it 😐</div>;
    } else if (successCalc < 75) {
      successRate = (
        <div className='successRate'>On the road to getting it 🙂</div>
      );
    } else if (successCalc < 100) {
      successRate = <div className='successRate'>Almost got it! 😄</div>;
    } else if (successCalc === 100) {
      successRate = <div className='successRate'>Got it! 😎</div>;
    }
    return (
      <Wrapper>
        <ResultsCard className='resultsCard'>
          <div className='title'>Results</div>
          {successRate}
          {deckPlayed.cards.map((question, idx) => {
            return (
              <>
                <div className='question'>{question.question}</div>
                <div className='answer'>
                  Answer: {question.choices[question.answer]}
                </div>
                {question.choices[this.props.answers[idx].answer] ===
                question.choices[question.answer] ? (
                  <div className='userAnswer' style={{ color: 'green' }}>
                    Your answer:{' '}
                    {question.choices[this.props.answers[idx].answer]}
                  </div>
                ) : (
                  <div className='userAnswer' style={{ color: 'red' }}>
                    Your answer:{' '}
                    {question.choices[this.props.answers[idx].answer]}
                  </div>
                )}
              </>
            );
          })}
          <div className='button'>
            <Link
              className='playAgain'
              onClick={() => this.handlePlayAgain()}
              to={'/'}
            >
              Play again
            </Link>
          </div>
        </ResultsCard>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state.decks,
    answers: state.answers,
  };
};

export default connect(mapStateToProps)(Results);
