import { parseEther } from '@ethersproject/units'
import { Wei } from '../src'

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
})
