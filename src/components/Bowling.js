import React, { Component } from 'react'
import ScoreCard from './ScoreCard'
import { Container, Button, Divider } from 'semantic-ui-react'

import * as BowlingActions from '../actions/BowlingActions.js'
import BowlingStore from '../stores/BowlingStore.js'

class Bowling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bowlingRollsStore: BowlingStore.getAllRolls(),
      bowlingScoresStore: BowlingStore.getAllScores(),
      bowlingProgressStore: BowlingStore.progress,
      bowlingTotal: BowlingStore.total
    }
  }

  componentWillMount() {
    BowlingStore.on('change', () => {
      this.setState({
        bowlingRollsStore: BowlingStore.getAllRolls(),
        bowlingScoresStore: BowlingStore.getAllScores(),
        bowlingProgressStore: BowlingStore.progress,
        bowlingTotal: BowlingStore.total
      })
    })
  }

  addRoll(number) {
    BowlingActions.addRoll(number)
  }

  maxButton() {
    let frame = this.state.bowlingProgressStore.frame
    let roll = this.state.bowlingProgressStore.roll

    if (roll !== 0 && frame !== 9) {
      return (11 - this.state.bowlingRollsStore[frame])
    }
    return 11;
  }

  render() {
    const { bowlingRollsStore, bowlingScoresStore } = this.state;

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
        <ScoreCard theRolls={theRolls} theScores={theScores} />

        <Divider hidden />

        <Container textAlign={'left'}>
          <strong>Add roll:</strong> {rollButtons.slice(0,this.maxButton())}
        </Container>

        <Divider hidden />
      </div>
    );
  }
}

export default Bowling;
