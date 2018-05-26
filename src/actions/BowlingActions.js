import dispatcher from '../dispatcher';

export function addRoll(number) {
  dispatcher.dispatch({
    type: "ADD_ROLL",
    number,
  })
}
