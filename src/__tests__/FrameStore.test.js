import React from 'react'
import frameStore from '../stores/FrameStore'

describe('FrameStore', () => {
  describe('Constructor on load', () => {
    it('Has an empty rolls array', () => {
      expect(frameStore._rolls).toEqual([])
    })

    it('Has an empty presentation array', () => {
      expect(frameStore._presentation).toEqual([])
    })

    it('Has a score set to zero', () => {
      expect(frameStore._score).toEqual(0)
    })

    it('Has a type set to normal by default', () => {
      expect(frameStore._type).toEqual('NORMAL')
    })
  })

  describe('addRoll()', () => {
    it('Can add a number to _rolls', () => {
      frameStore._rolls = []
      const number = 5

      frameStore.addRoll(number)
      expect(frameStore._rolls).toContain(number)
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
      frameStore._rolls = []
      frameStore._type = 'NORMAL'
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
      frameStore._rolls = []
      frameStore._type = 'END'
    })

    it('Allows a third roll if a strike/spare has already been rolled', () => {
      frameStore.addRoll(10)
      frameStore.addRoll(10)
      frameStore.addRoll(10)
      expect(frameStore._rolls).toEqual([10, 10, 10])
    })
  })
})
