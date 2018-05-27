import React from 'react';
import BowlingStore from '../stores/BowlingStore'

describe('BowlingStore', () => {

  describe('constructor store on load', () => {
    it('scoreCard is has 10 frames', () => {
      expect(bowlingStore.scoreCard.length).toEqual(10)
    })

    it('progress is set to frame 0 and roll 0', () => {
      const expectedFormat = { 'frame': 0, 'roll': 0 }
      expect(bowlingStore.progress).toEqual(expectedFormat)
    })
  })

  describe('gettAllRolls()', () => {
    it('Returns 10 arrays each with two empty strings', () => {
      expect(bowlingStore.getAllRolls().length).toEqual(10)
    })
  })
})
