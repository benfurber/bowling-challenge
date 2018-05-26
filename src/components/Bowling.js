import React, { Component } from 'react'
// import ScoreCard from './ScoreCard'
import { Button, Divider } from 'semantic-ui-react'

import * as BowlingActions from '../actions/BowlingActions.js'
import BowlingStore from '../stores/BowlingStore.js'

class Bowling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bowlingStore: BowlingStore.getAll()
    }
  }

  componentWillMount() {
    BowlingStore.on('change', () => {
      this.setState({
        bowlingStore: BowlingStore.getAll()
      })
    })
  }

  addRoll(number) {
    BowlingActions.addRoll(number)
  }

  render() {
    const { bowlingStore } = this.state;

    const theRolls = bowlingStore.map((frame) => {
      return frame.rolls.map((roll) => {
        let key = 'roll-' + frame.id + '-' + roll;
        return <li key={key} id={key}>{roll}</li>;
      })
    });

    return (
      <div className="Bowling">
          <div>
            <ul>
              { theRolls }
            </ul>
          </div>
          <Divider hidden />

          <Button onClick={this.addRoll.bind(this, 1)}>1</Button>
          <Button onClick={this.addRoll.bind(this, 5)}>5</Button>

      </div>
    );
  }
}

export default Bowling;
