import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './main.css';
import NavBar from './NavBar.jsx';
import Deck from './Deck.jsx';
import BoardComponent from './Board.jsx';
import CreateDeck from './CreateDeck.jsx';

const renderBoard = () => {
  return (
    <>
      <BoardComponent />
    </>
  );
};

const renderDeck = routerData => {
  const id = Number(routerData.match.params.id);
  return <Deck id={id} />;
};

const renderCreateDeck = () => {
  return (
    <>
      <CreateDeck />
    </>
  );
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <NavBar />
        <div>
          <Route exact={true} path='/' render={renderBoard} />
          <Route exact={true} path='/deck/:id' render={renderDeck} />
          <Route exact={true} path='/createdeck' render={renderCreateDeck} />
        </div>
      </BrowserRouter>
    );
  };
}
export default App;
