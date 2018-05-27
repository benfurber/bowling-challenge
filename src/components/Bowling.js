import React, { Component } from 'react'
import ScoreCard from './ScoreCard'
import { Button, Divider } from 'semantic-ui-react'

import * as BowlingActions from '../actions/BowlingActions.js'
import BowlingStore from '../stores/BowlingStore.js'

class Bowling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bowlingRollsStore: BowlingStore.getAllRolls(),
      bowlingScoresStore: BowlingStore.getAllScores(),
      bowlingProgressStore: BowlingStore.progress
    }
  }

  componentWillMount() {
    BowlingStore.on('change', () => {
      this.setState({
        bowlingRollsStore: BowlingStore.getAllRolls(),
        bowlingScoresStore: BowlingStore.getAllScores(),
        bowlingProgressStore: BowlingStore.progress
      })
    })
  }

  addRoll(number) {
    BowlingActions.addRoll(number)
  }

  render() {
    const { bowlingRollsStore, bowlingScoresStore, bowlingProgressStore } = this.state;

    const theRolls = bowlingRollsStore
    const theScores = bowlingScoresStore

    const rollButtons = [];
    for (var i = 0; i < 11; i++) {
      let key = 'rollButton-' + i
      rollButtons.push(
        <Button onClick={this.addRoll.bind(this, i)} key={key} id={key}>{i}</Button>
      )
    }

    return (
      <div className="Bowling">
          <div>
            <ul>
              <ScoreCard theRolls={theRolls} theScores={theScores} />
            </ul>
          </div>

          <Divider hidden />

          {rollButtons}

          <Divider hidden />

      </div>
    );
  }
}

export default Bowling;
