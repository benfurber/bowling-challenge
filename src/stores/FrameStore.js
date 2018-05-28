import { EventEmitter } from 'events'

class FrameStore extends EventEmitter {
  constructor(type='NORMAL') {
    super()
    this._rolls = []
    this._presentation = []
    this._score = 0
    this._type = type
  }

  addRoll(number) {
    this._rollChecks(number)
    this._rolls.push(number)
  }

  _rollChecks(number) {
    if (!Number.isInteger(number)) {
      throw new Error("Not given an integer (whole number)")
    }
    if (this._type == 'NORMAL') {
      this._rollChecksNormal(number)
    }
    if (this._type == 'END') {
      this._rollChecksEnd(number)
    }
  }

  _rollChecksNormal(number) {
    if (this._rolls.length == 2) {
      throw new Error("Frame already has two rolls")
    }
    if (this._rolls[0] + number >= 10) {
      throw new Error("Frame can't equal more than 10")
    }
  }

  _rollChecksEnd(number) {
    if (this._rolls[0] + this._rolls[1] < 10) {
      throw new Error ("Strike/spare not scored, third roll not allowed")
    }
  }

}

const frameStore = new FrameStore();

export default frameStore;
