import { parseEther } from '@ethersproject/units'
import { Integer64x64, toBN, Wei } from '../src'

describe('Web3-Units', function() {
  describe('Wei', function() {
    it('initializes a new Wei', async function() {
      const one = parseEther('1')
      const value = new Wei(one)
      expect(value.raw).toBe(one)
      expect(value.float).toBe(1)
      expect(value.parsed).toBe('1.0')
      expect(value.gt(parseEther('2'))).toBe(false)
      expect(value.gt(parseEther('0.5'))).toBe(true)
    })
  })

  describe('Integer64x64', function() {
    it('initializes a fixed point 64x64 integer', async function() {
      const value = new Integer64x64(toBN('11288117352251203228'))
      expect(value.parsed).toBe(0.6119300678291038)
    })
  })
})
