import React from 'react'
import frameStore from '../stores/FrameStore'

describe('FrameStore', () => {
  describe('constructor on load', () => {
    it('has an empty rolls array', () => {
      expect(frameStore._rolls).toEqual([])
    })

    it('has an empty presentation array', () => {
      expect(frameStore._presentation).toEqual([])
    })
  })
})
