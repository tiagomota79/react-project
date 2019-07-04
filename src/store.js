import { createStore } from 'redux';
import { initialDecks } from './data';

const initialState = {
  question: '',
  answers: [],
  decks: initialDecks,
  searchQuery: '',
};

const reducer = (state, action) => {
  if (action.type === '@@INIT') {
    return { ...state };
  }
  if (action.type === 'goHome') {
    return {
      ...state,
      answers: [],
    };
  }
  if (action.type === 'query') {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === 'advanceQuiz') {
    return {
      ...state,
      answers: [...state.answers, { answer: action.answer }],
    };
  }
  if (action.type === 'createDeck') {
    return {
      ...state,
      decks: [...state.decks.concat(action.newDeck)],
    };
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState());

export default store;
