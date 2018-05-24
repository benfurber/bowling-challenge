import './App.css';
import Bowling from './Bowling'
import React, { Component } from 'react';
import ScoreCard from './components/ScoreCard'
import { Button, Container, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);
    var game = new Bowling()
    game.addRoll(5)
    game.addRoll(5)
    game.addRoll(3)
    this.state = { game: game._scoreCard };
  }
  render() {
    console.log(this.state.game)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bowling!</h1>
        </header>

        <Container>
          <Divider hidden />
          <Divider horizontal>Score Card</Divider>
          <Divider hidden />
          <ScoreCard rolls={this.state.game} />
          <Divider hidden />
        </Container>

        <Button>Click Here</Button>
      </div>
    );
  }
}

export default App;
