import { EventEmitter } from 'events';
import dispatcher from '../dispatcher.js';

class BowlingStore extends EventEmitter {
  constructor() {
    super()
    this.scoreCard = [
      {id: 1, rolls: [], presentation: [], score: 0},
      {id: 2, rolls: [], presentation: [], score: 0},
      {id: 3, rolls: [], presentation: [], score: 0},
      {id: 4, rolls: [], presentation: [], score: 0},
      {id: 5, rolls: [], presentation: [], score: 0},
      {id: 6, rolls: [], presentation: [], score: 0},
      {id: 7, rolls: [], presentation: [], score: 0},
      {id: 8, rolls: [], presentation: [], score: 0},
      {id: 9, rolls: [], presentation: [], score: 0},
      {id: 10, rolls: [], presentation: [], score: 0}
    ]
    this.progress = { 'frame': 0, 'roll': 0 }
    this.total = 0
  }

  // Main 'public' methods

  getAllRolls() {
    return this.scoreCard.map((frame) => {
      if (frame.rolls[0] == null) {
        return ['', '']
      } else {
        return frame.presentation
      }
    });
  }

  getAllScores() {
    let running_total = 0

    var scores = Array(10).fill(' ')
    for (var i = 0; i < this.progress.frame; i++) {
      running_total += this.scoreCard[i].score
      scores[i] = running_total
    }
    return scores
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_ROLL": {
        this._addRoll(action.number);
        break;
      }
      default: {}
    }
  }

  // 'Private' methods

  _addRoll(number) {
    this._addRollChecks(number)

    this._addToRoll(number)
    this._addToPresentation(number)
    this._addToScore(number)

    this._nextTurn(number)
    if (this.progress.frame === 10) {
      console.log('game finished')
    }
    this.emit("change")
  }

  _addToRoll(number) {
    this.scoreCard[this.progress.frame].rolls[this.progress.roll] = number
    this._extraPointsCalculation()
  }

  _addToPresentation(number) {
    var presentationLocation = this.scoreCard[this.progress.frame].presentation

    if (number === 10 && this.progress.frame === 9) {
      return presentationLocation[this.progress.roll] = 'X'
    }

    if (number === 10 && this.progress.roll === 0) {
      presentationLocation[this.progress.roll] = ' '
      presentationLocation[this.progress.roll + 1] = 'X'
    } else if (number + presentationLocation[this.progress.roll - 1] === 10) {
      presentationLocation[this.progress.roll] = '/'
    } else {
      presentationLocation[this.progress.roll] = number
    }
  }

  _addToScore(number) {
    this.scoreCard[this.progress.frame].score += number
  }

  _extraPointsCalculation() {
    this._sparePointsCalculation()
    this._strikePointsCalculation()
  }

  _sparePointsCalculation() {
    var frame = this.progress.frame
    if (frame >= 10 || (frame < 1 || this.progress.roll === 1)) { return }

    console.log("Spare: ", this.progress.frame)

    var previousFrame = frame - 1

    if (this.scoreCard[previousFrame].rolls[0] + this.scoreCard[previousFrame].rolls[1] === 10) {
      this.scoreCard[previousFrame].score += this.scoreCard[frame].rolls[0]
    }
  }

  _strikePointsCalculation() {
    var frame = this.progress.frame
    if (frame > 10 || (frame < 2 || this.progress.roll === 1)) { return }

    console.log("Strike: ", this.progress.frame)

    var previousFrame = frame - 1
    var twoFramesBack = frame - 2

    if (this.scoreCard[twoFramesBack].rolls[0] === 10) {
      this.scoreCard[twoFramesBack].score += this.scoreCard[previousFrame].rolls[0]
      if (this.scoreCard[previousFrame].rolls.length === 1) {
        this.scoreCard[twoFramesBack].score += this.scoreCard[frame].rolls[0]
      } else {
        this.scoreCard[twoFramesBack].score += this.scoreCard[previousFrame].rolls[1]
      }
    }
  }

  _nextTurn(number) {
    if (this.progress.frame !== 9 && (number === 10 || this.progress.roll === 1)) {
      this.progress.frame += 1;
      this.progress.roll = 0;
    } else if (this.progress.frame === 9 && this.progress.roll === 2) {
      this.progress.frame += 1;
      this.progress.roll = 0;
    } else {
      this.progress.roll += 1;
    }
  }

  _addRollChecks(number) {
    if (!Number.isInteger(number)) {
      throw new Error("Not given a number")
    }
  }
}

const bowlingStore = new BowlingStore();

dispatcher.register(bowlingStore.handleActions.bind(bowlingStore))

window.bowlingStore = bowlingStore

export default bowlingStore;
