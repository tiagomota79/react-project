import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.jsx';
import styled from 'styled-components';
import store from './store.js';

const Wrapper = styled.div`
  text-align: center;
  background-color: #f2f2f2;
  height: 100%;
`;

const CreateDeckCard = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 5px;
  width: 65%;
  margin: 2%;
  box-shadow: 0 0 5px 2px lightgrey;
  text-align: center;

  & > .title {
    background-color: #262626;
    color: white;
    font-weight: 900;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 10px;
  }

  & > form > .deckTitle {
    margin: 1%;
  }

  & > form > .deckTitle > div > input {
    border-radius: 5px;
    border-width: thin;
    width: 80%;
    min-height: 20px;
    border-color: lightgrey;
    margin: 2%;
  }

  & > form > .newCard {
    border-radius: 5px;
    border-style: solid;
    border-color: lightgray;
    border-width: 1px;
    margin-left: 10.5%;
    padding: 2%;
    margin-right: 10.5%;
  }

  & form > .submit {
    background-color: dodgerblue;
    color: white;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    width: 80%;
    margin: 2%;
    font-size: inherit;
  }
`;

class CreateDeck extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      title: '',
      question: '',
      choices: [],
      choice0: '',
      choice1: '',
      choice2: '',
      choice3: '',
      answer: 0,
    };
  }
  handleTitle = event => {
    this.setState({ title: event.target.value });
  };
  handleQuestion = event => {
    this.setState({ question: event.target.value });
  };
  handleChoice0 = event => {
    this.setState({ choice0: event.target.value });
  };
  handleChoice1 = event => {
    this.setState({ choice1: event.target.value });
  };
  handleChoice2 = event => {
    this.setState({ choice2: event.target.value });
  };
  handleChoice3 = event => {
    this.setState({ choice3: event.target.value });
  };
  handleSubmit = event => {
    this.props.dispatch({
      type: 'createDeck',
      newDeck: {
        id: this.props.decks.length,
        title: this.state.title,
        cards: [
          {
            question: this.state.question,
            choices: [
              this.state.choice0,
              this.state.choice1,
              this.state.choice2,
              this.state.choice3,
            ],
            answer: 0,
          },
        ],
      },
    });
    this.setState({
      id: 0,
      title: '',
      question: '',
      choices: [],
      choice0: '',
      choice1: '',
      choice2: '',
      choice3: '',
      answer: 0,
    });
    event.preventDefault();
    console.log(store.getState());
  };
  render() {
    return (
      <Wrapper>
        <CreateDeckCard className='createDeck'>
          <div className='title'>Create a deck</div>
          <form onSubmit={this.handleSubmit}>
            <div className='deckTitle'>
              Title
              <div>
                <input
                  type='text'
                  value={this.state.title}
                  onChange={this.handleTitle}
                />
              </div>
            </div>
            <div className='newCard'>
              <div>
                Question 0
                <input
                  type='text'
                  value={this.state.question}
                  onChange={this.handleQuestion}
                />
              </div>
              <div>
                Choice 0
                <input
                  type='text'
                  value={this.state.choice0}
                  onChange={this.handleChoice0}
                />
                Mark as answer:
                <input type='radio' name='q0choice' />
              </div>
              <div>
                Choice 1
                <input
                  type='text'
                  value={this.state.choice1}
                  onChange={this.handleChoice1}
                />
                Mark as answer:
                <input type='radio' name='q0choice' />
              </div>
              <div>
                Choice 2
                <input
                  type='text'
                  value={this.state.choice2}
                  onChange={this.handleChoice2}
                />
                Mark as answer:
                <input type='radio' name='q0choice' />
              </div>
              <div>
                Choice 3
                <input
                  type='text'
                  value={this.state.choice3}
                  onChange={this.handleChoice3}
                />
                Mark as answer:
                <input type='radio' name='q0choice' />
              </div>
            </div>
            {/* <div className='newCard'>
              <div>
                Question 1
                <input type='text' />
              </div>
              <div>
                Choice 0
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q1choice' />
              </div>
              <div>
                Choice 1
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q1choice' />
              </div>
              <div>
                Choice 2
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q1choice' />
              </div>
              <div>
                Choice 3
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q1choice' />
              </div>
            </div>
            <div className='newCard'>
              <div>
                Question 2
                <input type='text' />
              </div>
              <div>
                Choice 0
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q2choice' />
              </div>
              <div>
                Choice 1
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q2choice' />
              </div>
              <div>
                Choice 2
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q2choice' />
              </div>
              <div>
                Choice 3
                <input type='text' />
                Mark as answer:
                <input type='radio' name='q2choice' />
              </div>
            </div> */}
            <input className='submit' type='submit' value='Submit' />
          </form>
        </CreateDeckCard>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state.decks,
  };
};

export default connect(mapStateToProps)(CreateDeck);
