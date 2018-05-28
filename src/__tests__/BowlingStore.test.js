import React from 'react'
import { BowlingStore } from '../stores/BowlingStore'
import { FrameStore } from '../stores/FrameStore'

var bowlingStore = new BowlingStore;

describe('bowlingStore', () => {

  describe('constructor on load', () => {
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

  describe('_addRoll()', () => {

    it('Takes a number and sends that number to the appropriate frame', () => {
      const number = 8
      bowlingStore.scoreCard = [(new FrameStore)]
      bowlingStore.progress = { 'frame': 0, 'roll': 0 }

      bowlingStore._addRoll(number)
      expect(bowlingStore.scoreCard[0].rolls).toEqual([number])
    })

    it('Takes a sequence numbers and sends each one to the right frame', () => {
      const firstNumber = 7
      const secondNumber = 2
      const thirdNumber = 6
      var firstFrame = new FrameStore
      bowlingStore.scoreCard = [firstFrame, (new FrameStore)]

      bowlingStore._addRoll(firstNumber)
      bowlingStore._addRoll(secondNumber)
      bowlingStore._addRoll(thirdNumber)

      expect(bowlingStore.scoreCard[1].rolls).toEqual([thirdNumber])
    })
  })

})
