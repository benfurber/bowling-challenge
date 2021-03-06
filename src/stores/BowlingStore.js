import { EventEmitter } from 'events';
import dispatcher from '../dispatcher.js';
import { FrameStore } from '../stores/FrameStore'

class BowlingStore extends EventEmitter {
  constructor() {
    super()
    this.scoreCard = this._populateScoreCard()
    this.progress = { 'frame': 0, 'roll': 0 }
    this.total = 0
  }

  // Main 'public' methods

  getAllRolls() {
    return this.scoreCard.map((frame) => {
      if (frame.presentation[0] == null) {
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

  _populateScoreCard() {
    let framesArray = Array(9).fill().map(u => (new FrameStore()))
    framesArray.push(new FrameStore('END'))
    return framesArray
  }

  _addRoll(number) {
    this.scoreCard[this.progress.frame].addRoll(number)
    this._extraPointsCalculation()
    this._nextTurn(number)

    if (this.progress.frame === 10) {
      this.total = this.getAllScores().last
    }
    this.emit("change")
  }

  _extraPointsCalculation() {
    this._sparePointsCalculation()
    this._strikePointsCalculation()
  }

  _sparePointsCalculation() {
    var frame = this.progress.frame
    if (frame >= 10 || (frame < 1 || this.progress.roll === 1)) { return }

    var previousFrame = frame - 1

    if (this.scoreCard[previousFrame].rolls[0] + this.scoreCard[previousFrame].rolls[1] === 10) {
      this.scoreCard[previousFrame].score += this.scoreCard[frame].rolls[0]
    }
  }

  _strikePointsCalculation() {
    var frame = this.progress.frame
    if (frame < 2 || this.progress.roll === 1) { return }

    var previousFrame = frame - 1
    var twoFramesBack = frame - 2

    if (frame === 9 && this.progress.roll === 2) {
      twoFramesBack = frame - 1
    }

    if (this.scoreCard[twoFramesBack].rolls[0] === 10) {
      this.scoreCard[twoFramesBack].score += this.scoreCard[previousFrame].rolls[0]
      if (this.scoreCard[previousFrame].rolls.length === 1) {
        this.scoreCard[twoFramesBack].score += this.scoreCard[frame].rolls[0]
      } else {
        this.scoreCard[twoFramesBack].score += this.scoreCard[previousFrame].rolls[1]
      }
    }
  }

  _frameComplete(number) {
    var currentFrame = this.scoreCard[this.progress.frame]

    if (currentFrame.type == 'NORMAL' && currentFrame.presentation.length == 2) {
      return true
    } else if (currentFrame.presentation.length == 3) {
      return true
    } else if (currentFrame.presentation.length == 2 && (currentFrame.rolls[0] + currentFrame.rolls[1] < 10)) {
      return true
    }

    return false
  }

  _nextTurn(number) {
    var answer = this._frameComplete(number)

    if (answer) {
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

export default bowlingStore;
