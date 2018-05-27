import React from 'react';
import * as actions from '../actions/BowlingActions'

xdescribe('actions', () => {
  it('should dispatch a "ADD_ROLL" type with a number', () => {
    const number = 5
    const expectedAction = {
      type: "ADD_ROLL",
      number
    }

    expect(actions.addRoll(number)).toReturn(expectedAction)
  })
})
