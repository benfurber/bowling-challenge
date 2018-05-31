import React from 'react'
import bowlingStore from '../stores/BowlingStore'
import { FrameStore } from '../stores/FrameStore'

describe('bowlingStore', () => {

  describe('constructor on load', () => {
    it('scoreCard is populated with 10 frames', () => {
      expect(bowlingStore.scoreCard).toContainEqual(new FrameStore)
      expect(bowlingStore.scoreCard.length).toEqual(10)
    })

    it('progress is set to frame 0 and roll 0', () => {
      const expectedFormat = { 'frame': 0, 'roll': 0 }

      expect(bowlingStore.progress).toEqual(expectedFormat)
    })
  })

  describe('gettAllRolls()', () => {
    it('Returns 10 arrays each with two empty strings', () => {
      bowlingStore.scoreCard = new Array(10).fill().map(u => (new FrameStore))

      expect(bowlingStore.getAllRolls().length).toEqual(10)
    })
  })

  describe('_addRoll()', () => {

    beforeEach(() => {
      bowlingStore.progress = { 'frame': 0, 'roll': 0 }
    })

    it('Takes a number and sends that number to the appropriate frame', () => {
      const number = 8
      bowlingStore.scoreCard = [(new FrameStore)]

      bowlingStore._addRoll(number)

      expect(bowlingStore.scoreCard[0].rolls).toEqual([number])
    })

    it('Takes a sequence numbers and sends each one to the right frame', () => {
      const firstNumber = 7
      const secondNumber = 2
      const thirdNumber = 6

      bowlingStore.scoreCard = new Array(2).fill().map(u => (new FrameStore))

      bowlingStore._addRoll(firstNumber)
      bowlingStore._addRoll(secondNumber)
      bowlingStore._addRoll(thirdNumber)

      expect(bowlingStore.scoreCard[1].rolls).toEqual([thirdNumber])
    })

    it('Takes a sequence of strikes and sends each one to seperate frames', () => {
      const strike = 10
      bowlingStore.scoreCard = new Array(3).fill().map(u => (new FrameStore))

      bowlingStore._addRoll(strike)
      bowlingStore._addRoll(strike)
      bowlingStore._addRoll(strike)

      expect(bowlingStore.scoreCard[2].rolls).toEqual([strike])
    })

    it('Takes three strikes and will add all three to an end frame', () => {
      const strike = 10
      bowlingStore.scoreCard = [(new FrameStore({type:'END'}))]

      bowlingStore._addRoll(strike)
      bowlingStore._addRoll(strike)
      bowlingStore._addRoll(strike)

      expect(bowlingStore.scoreCard[0].rolls).toEqual([strike, strike, strike])
    })

    it("Won't add a third roll to an end frame if no share or strike rolled", () => {
      bowlingStore.scoreCard = [(new FrameStore('END'))]

      bowlingStore._addRoll(7)
      bowlingStore._addRoll(2)

      expect(() => {
        bowlingStore._addRoll(4)
      }).toThrow()
    })
  })

  describe('_sparePointsCalculation()', () => {
    it('Current roll added to a previous frame score if previous frame is a spare', () => {
      const roll = 5
      const startingScore = 10
      var firstFrame = {rolls: [6, 4], score: startingScore }
      var secondFrame = {rolls: [roll], score: 5 }

      bowlingStore.scoreCard = [firstFrame, secondFrame]
      bowlingStore.progress = { 'frame': 1, 'roll': 0 }

      bowlingStore._sparePointsCalculation()

      expect(firstFrame.score).toEqual(startingScore + roll)
    })
  })

  describe('_strikePointsCalculation()', () => {
    it('Current roll (5) and previous roll (5) added to the previous frame score if previous frame is a strike', () => {
      const firstExtraRoll = 5
      const secondExtraRoll = 5
      const strike = 10
      var firstFrame = {rolls: [strike], score: strike }
      var secondFrame = {rolls: [firstExtraRoll, secondExtraRoll], score: (firstExtraRoll + secondExtraRoll) }

      bowlingStore.scoreCard = [firstFrame, secondFrame]
      bowlingStore.progress = { 'frame': 2, 'roll': 0 }

      bowlingStore._strikePointsCalculation()

      expect(firstFrame.score).toEqual(strike + firstExtraRoll + secondExtraRoll)
    })

    it('Current roll (10) and previous roll (10) added to the previous frame score if previous frame is a strike', () => {
      const strike = 10
      const firstExtraRoll = 5
      const secondExtraRoll = 5
      var firstFrame = {rolls: [strike], score: strike }
      var secondFrame = {rolls: [strike], score: strike }
      var thirdFrame = {rolls: [strike], score: strike }

      bowlingStore.scoreCard = [firstFrame, secondFrame, thirdFrame]
      bowlingStore.progress = { 'frame': 2, 'roll': 0 }

      bowlingStore._strikePointsCalculation()

      expect(firstFrame.score).toEqual(strike + strike + strike)
    })
  })
})
