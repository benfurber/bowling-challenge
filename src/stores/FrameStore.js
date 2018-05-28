import { EventEmitter } from 'events'

class FrameStore extends EventEmitter {
  constructor(type='NORMAL') {
    super()
    this.rolls = []
    this.presentation = []
    this.score = 0
    this.type = type
  }

  addRoll(number) {
    this._rollChecks(number)
    this.rolls.push(number)
    this._addPresentation(number)
  }

  _rollChecks(number) {
    if (!Number.isInteger(number)) {
      throw new Error("Not given an integer (whole number)")
    }
    if (this.type == 'NORMAL') {
      this._rollChecksNormal(number)
    }
    if (this.type == 'END') {
      this._rollChecksEnd(number)
    }
  }

  _rollChecksNormal(number) {
    if (this.rolls.length == 2) {
      throw new Error("Frame already has two rolls")
    }
    if (this.rolls[0] + number >= 10) {
      throw new Error("Frame can't equal more than 10")
    }
  }

  _rollChecksEnd(number) {
    if (this.rolls[0] + this.rolls[1] < 10) {
      throw new Error ("Strike/spare not scored, third roll not allowed")
    }
  }

  _addPresentation(number) {
    const index = this.presentation.length

    if (index > 0 && (this.rolls[index - 1] + number == 10)) {
      return this.presentation.push('/')
    }

    if (number == 10) {
      if (this.type == 'NORMAL') {
        this.presentation.push(' ')
      }
      return this.presentation.push('X')
    }

    return this.presentation.push(number)
  }
}

module.exports = { FrameStore }
