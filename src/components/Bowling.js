import React, { Component } from 'react'
import ScoreCard from './ScoreCard'
import { Container, Button, Divider } from 'semantic-ui-react'

import * as BowlingActions from '../actions/BowlingActions.js'
import BowlingStore from '../stores/BowlingStore.js'

class Bowling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollsStore: BowlingStore.getAllRolls(),
      scoresStore: BowlingStore.getAllScores(),
      progressStore: BowlingStore.progress,
      total: BowlingStore.total
    }
  }

  componentWillMount() {
    BowlingStore.on('change', () => {
      this.setState({
        rollsStore: BowlingStore.getAllRolls(),
        scoresStore: BowlingStore.getAllScores(),
        progressStore: BowlingStore.progress,
        total: BowlingStore.total
      })
    })
  }

  addRoll(number) {
    BowlingActions.addRoll(number)
  }

  maxButton() {
    let frame = this.state.progressStore.frame
    let roll = this.state.progressStore.roll

    if (roll !== 0 && frame !== 9) {
      return (11 - this.state.rollsStore[frame])
    } else if (frame === 10) {
      return 0
    }
    return 11;
  }

  render() {
    const { rollsStore, scoresStore } = this.state;

    const theRolls = rollsStore
    const theScores = scoresStore

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
