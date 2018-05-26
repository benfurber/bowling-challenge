import './App.css';
import React, { Component } from 'react';
import Bowling from './components/Bowling'
import { Container, Divider } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bowling!</h1>
        </header>

        <Container>
          <Divider hidden />
          <Divider horizontal>Score Card</Divider>
          <Divider hidden />

          <Bowling />

          <Divider hidden />
        </Container>
      </div>
    );
  }
}

export default App;
