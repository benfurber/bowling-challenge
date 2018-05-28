import React from 'react';
import { FrameStore } from '../stores/FrameStore';

var frameStore;

describe('FrameStore', () => {

  beforeEach(() => {
    frameStore = new FrameStore
  })

  describe('Constructor on load', () => {
    it('Has an empty rolls array', () => {
      expect(frameStore.rolls).toEqual([])
    })

    it('Has an empty presentation array', () => {
      expect(frameStore.presentation).toEqual([])
    })

    it('Has a score set to zero', () => {
      expect(frameStore.score).toEqual(0)
    })

    it('Has a type set to normal by default', () => {
      expect(frameStore.type).toEqual('NORMAL')
    })
  })

  describe('addRoll()', () => {
    it('Can add a number to rolls', () => {
      frameStore.rolls = []
      const number = 5

      frameStore.addRoll(number)
      expect(frameStore.rolls).toContain(number)
    })

    it('Throws an error if not given an integer', () => {
      const notNumber = 'string'
      expect(() => {
        frameStore.addRoll(notNumber)
      }).toThrow();
    })
  })

  describe('addRoll() for a normal frame', () => {
    beforeEach(() => {
      frameStore.rolls = []
      frameStore.type = 'NORMAL'
    })

    it('Throws an error if given more than two integers', () => {
      frameStore.addRoll(5)
      frameStore.addRoll(3)

      expect(() => {
        frameStore.addRoll(2)
      }).toThrow();
    })

    it('Throws an error if second number plus first number would equal more than 10', () => {
      frameStore.addRoll(5)

      expect(() => {
        frameStore.addRoll(6)
      }).toThrow();
    })
  })

  describe('addRoll() for an end frame', () => {
    beforeEach(() => {
      frameStore.rolls = []
      frameStore.type = 'END'
    })

    it('Allows a third roll if a strike/spare has already been rolled', () => {
      frameStore.addRoll(10)
      frameStore.addRoll(10)
      frameStore.addRoll(10)
      expect(frameStore.rolls).toEqual([10, 10, 10])
    })
  })

  describe('addPresentation()', () => {
    it("Adds the number for a frame's first roll if below 10", () => {
      const number = 4
      frameStore.rolls = [number]
      frameStore.presentation = []

      frameStore._addPresentation(number)
      expect(frameStore.presentation).toEqual([number])
    })

    it("Adds an '/' when a spare is rolled", () => {
      const firstNumber = 3
      const secondNumber = 7
      frameStore.rolls = [firstNumber, secondNumber]
      frameStore.presentation = [firstNumber]

      frameStore._addPresentation(secondNumber)
      expect(frameStore.presentation).toEqual([firstNumber, '/'])
    })

    it("Adds an 'X' when a strike is rolled", () => {
      const number = 10
      frameStore.rolls = [number]
      frameStore.presentation = []

      frameStore._addPresentation(number)
      expect(frameStore.presentation).toContain('X')
    })
  })

  describe('addPresentation() for a normal frame', () => {
    beforeEach(() => {
      frameStore.type = 'NORMAL'
      frameStore.presentation = []
    })

    it("Adds ' ' before 'X' if a strike is scored", () => {
      const number = 10
      frameStore.rolls = [number]

      frameStore._addPresentation(number)
      expect(frameStore.presentation).toEqual([' ', 'X'])
    })
  })

  describe('addPresentation() for an end frame', () => {
    beforeEach(() => {
      frameStore.type = 'END'
      frameStore.rolls = []
      frameStore.presentation = []
    })

    it("Adds three 'X' for three strikes", () => {
      const strike = 10

      frameStore.rolls.push(strike)
      frameStore._addPresentation(strike)
      frameStore.rolls.push(strike)
      frameStore._addPresentation(strike)
      frameStore.rolls.push(strike)
      frameStore._addPresentation(strike)

      expect(frameStore.presentation).toEqual(['X', 'X', 'X'])
    })

    it("Adds 'X', a number and then a '/'", () => {
      const strike = 10
      const number = 5

      frameStore.rolls.push(strike)
      frameStore._addPresentation(strike)
      frameStore.rolls.push(number)
      frameStore._addPresentation(number)
      frameStore.rolls.push(number)
      frameStore._addPresentation(number)

      expect(frameStore.presentation).toEqual(['X', number, '/'])
    })

    it("Adds a number, a '/' and then a 'X'", () => {
      const number = 5
      const strike = 10

      frameStore.rolls.push(number)
      frameStore._addPresentation(number)
      frameStore.rolls.push(number)
      frameStore._addPresentation(number)
      frameStore.rolls.push(strike)
      frameStore._addPresentation(strike)

      expect(frameStore.presentation).toEqual([number, '/', 'X'])
    })
  })
})
