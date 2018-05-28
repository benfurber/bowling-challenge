import { EventEmitter } from 'events'

class FrameStore extends EventEmitter {
  constructor() {
    super()
    this._rolls = []
    this._presentation = []
    this.score = []
  }
}

const frameStore = new FrameStore();

export default frameStore;
