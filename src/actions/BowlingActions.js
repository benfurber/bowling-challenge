import dispatcher from '../dispatcher';

export function addRoll(number) {
  return dispatcher.dispatch({
    type: "ADD_ROLL",
    number,
  })
}
