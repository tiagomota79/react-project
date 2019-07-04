import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.jsx';
import styled from 'styled-components';

const Nav = styled.div`
  display: flex;
  background-color: dodgerblue;
  height: 6vh;
  align-items: center;
  justify-content: space-around;

  & > a {
    text-decoration: none;
    color: white;
    font-size: small;
    margin: 15px;
  }

  & > #logo {
    font-size: 2rem;
    font-family: montserrat;
  }

  & input {
    flex-grow: 2;
    border-radius: 5px;
    border: none;
    height: 50%;
  }
`;

class NavBar extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: 'query', q: evt.target.value });
  };
  handleGoHome = () => {
    this.props.dispatch({ type: 'goHome' });
  };
  render() {
    return (
      <>
        <Nav className='navBar'>
          <Link id='logo' onClick={() => this.handleGoHome()} to={'/'}>
            GOT IT!
          </Link>
          <input
            type='text'
            onChange={this.handleQuery}
            value={this.props.query}
          />
          <Link onClick={() => this.handleGoHome()} to={'/'}>
            Home
          </Link>
          <Link to={'/createdeck/'}>Create deck</Link>
        </Nav>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    query: state.searchQuery,
  };
};

export default connect(mapStateToProps)(NavBar);
