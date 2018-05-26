import { EventEmitter } from 'events';
import dispatcher from '../dispatcher.js';

class BowlingStore extends EventEmitter {
  constructor() {
    super()
    this.scoreCard = [
      {id: 1, rolls: []},
      {id: 2, rolls: []},
      {id: 3, rolls: []},
      {id: 4, rolls: []},
      {id: 5, rolls: []},
      {id: 6, rolls: []},
      {id: 7, rolls: []},
      {id: 8, rolls: []},
      {id: 9, rolls: []},
      {id: 10, rolls: []},
    ]
    this.progress = { 'frame': 0, 'roll': 0 }
    this.total = 0
  }

  addRoll(number) {
    if (!Number.isInteger(number)) {
      throw new Error("Not given a number")
    }

    this.scoreCard[this.progress.frame].rolls[this.progress.roll] = number;

    this.nextTurn(number)

    this.emit("change")
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
    return this.scoreCard;
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
}

const bowlingStore = new BowlingStore();

dispatcher.register(bowlingStore.handleActions.bind(bowlingStore))

window.bowlingStore = bowlingStore

export default bowlingStore;
