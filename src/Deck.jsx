import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.jsx';
import Results from './Results.jsx';
import styled from 'styled-components';
import store from './store.js';

const Wrapper = styled.div`
  text-align: center;
  background-color: #f2f2f2;
  height: 94vh;
`;

const QuestionCard = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 5px;
  width: 65%;
  margin: 2%;
  box-shadow: 0 0 5px 2px lightgrey;
  text-align: center;

  & > .question {
    font-size: xx-large;
    background-color: #262626;
    color: white;
    font-weight: 900;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 10px;
  }

  & > .progressBar {
    background-color: dodgerblue;
    height: 6px;
  }

  & > .choices {
    background-color: dodgerblue;
    border-radius: 5px;
    padding: 15px;
    width: 70%;
    color: white;
    font-size: x-large;
    margin: 2%;
    border-color: dodgerblue;
  }
`;

class Deck extends Component {
  handleQuiz = idx => {
    this.props.dispatch({
      type: 'advanceQuiz',
      answer: idx,
    });

    console.log(store.getState());
  };
  render() {
    const deckToPlay = this.props.decks.find(deck => deck.id === this.props.id);
    const questionIndex = this.props.answers.length;
    const questionOnScreen = deckToPlay.cards[questionIndex];
    const progressBar = `${(questionIndex / deckToPlay.cards.length) * 100}%`;
    console.log(progressBar);
    if (questionIndex === deckToPlay.cards.length) {
      return <Results deckId={this.props.id} />;
    }
    return (
      <Wrapper>
        <QuestionCard className='card'>
          <div className='question'>{questionOnScreen.question}</div>
          <div className='progressBar' style={{ width: progressBar }} />
          {questionOnScreen.choices.map((choice, idx) => {
            return (
              <button className='choices' onClick={() => this.handleQuiz(idx)}>
                {choice}
              </button>
            );
          })}
        </QuestionCard>
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

export default connect(mapStateToProps)(Deck);
