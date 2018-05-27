import React from 'react';
import BowlingStore from '../stores/BowlingStore'

describe('BowlingStore', () => {

  describe('constructor store on load', () => {
    it('scoreCard is has 10 frames', () => {
      expect(BowlingStore.scoreCard.length).toEqual(10)
    })

    it('each frame in scoreCard is structured with rolls, presentation and score', () => {
      const structure = {rolls: [], presentation: [], score: 0}
      expect(BowlingStore.scoreCard[1]).toEqual(structure)
    })

    it('progress is set to frame 0 and roll 0', () => {
      const expectedFormat = { 'frame': 0, 'roll': 0 }
      expect(BowlingStore.progress).toEqual(expectedFormat)
    })
  })

  describe('gettAllRolls()', () => {
    it('Returns 10 arrays each with two empty strings', () => {
      expect(BowlingStore.getAllRolls().length).toEqual(10)
    })
  })
})
