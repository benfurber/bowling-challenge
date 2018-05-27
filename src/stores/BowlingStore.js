import { EventEmitter } from 'events';
import dispatcher from '../dispatcher.js';

class BowlingStore extends EventEmitter {
  constructor() {
    super()
    this.scoreCard = [
      {id: 1, rolls: [], presentation: []},
      {id: 2, rolls: [], presentation: []},
      {id: 3, rolls: [], presentation: []},
      {id: 4, rolls: [], presentation: []},
      {id: 5, rolls: [], presentation: []},
      {id: 6, rolls: [], presentation: []},
      {id: 7, rolls: [], presentation: []},
      {id: 8, rolls: [], presentation: []},
      {id: 9, rolls: [], presentation: []},
      {id: 10, rolls: [], presentation: []},
    ]
    this.progress = { 'frame': 0, 'roll': 0 }
    this.total = 0
  }


  addRoll(number) {
    this._addRollChecks(number)

    this.addToRoll(number)
    this.addToPresentation(number)

    this.nextTurn(number)
    this.emit("change")
  }

  addToRoll(number) {
    this.scoreCard[this.progress.frame].rolls[this.progress.roll] = number
  }

  addToPresentation(number) {
    var presentationLocation = this.scoreCard[this.progress.frame].presentation

    if (number === 10 && this.progress.roll === 0) {
      presentationLocation[this.progress.roll] = ' '
      presentationLocation[this.progress.roll + 1] = 'X'
    } else if (number + presentationLocation[this.progress.roll - 1] === 10) {
      presentationLocation[this.progress.roll] = '/'
    } else {
      presentationLocation[this.progress.roll] = number
    }
  }

  nextTurn(number) {
    if (this.progress.frame !== 9 && (number === 10 || this.progress.roll === 1)) {
      this.progress.frame += 1;
      this.progress.roll = 0;
    } else {
      this.progress.roll += 1;
    }
  }

  getAll() {
    return this.scoreCard.map((frame) => {
      if (frame.rolls[0] == null) {
        return ['', '']
      } else {
        return frame.presentation
      }
    });
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_ROLL": {
        this.addRoll(action.number);
        break;
      }
      default: {}
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
