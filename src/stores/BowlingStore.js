import { EventEmitter } from 'events';
import dispatcher from '../dispatcher.js';

class BowlingStore extends EventEmitter {
  constructor() {
    super()
    this.scoreCard = [
      {
        id: 1,
        rolls: [5, 3]
      },
      {
        id: 2,
        rolls: [7]
      }
    ]
  }

  addRoll(number) {
    const id = this.scoreCard.length + 1;

    this.scoreCard.push({
      id,
      rolls: [number]
    });

    this.emit("change")
  }

  getAll() {
    return this.scoreCard;
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_ROLL": {
        this.addRoll(action.number);
      }
    }
  }
}

const bowlingStore = new BowlingStore();

dispatcher.register(bowlingStore.handleActions.bind(bowlingStore))

export default bowlingStore;
