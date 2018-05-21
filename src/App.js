import './App.css';
import Bowling from './Bowling'
import React, { Component } from 'react';
import ScoreCard from './components/ScoreCard'
import { Button, Container, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { game: function() { new Bowling() } };
  }
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
          <ScoreCard />
          <Divider hidden />
        </Container>

        <Button>Click Here</Button>
      </div>
    );
  }
}

export default App;
