import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'
import { FixedPointX64, parseFixedPointX64, parsePercentage, parseTime, Percentage, Time, toBN, Wei } from '../src'

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

  describe('FixedPointX64', function() {
    it('initializes a fixed point 64x64 integer', async function() {
      const value = new FixedPointX64(toBN('11288117352251203228'))
      expect(value.parsed).toBe(0.6119300678291038)
    })

    it('parseInt', async function() {
      const value = 1
      expect(parseFixedPointX64(value).parsed).toBe(1)
    })

    it('raw', async function() {
      const value = 1
      expect(parseFixedPointX64(value).raw.toString()).toBe(FixedPointX64.Denominator.mul(value).toString())
    })

    it('wei', async function() {
      const value = 1
      expect(parseFixedPointX64(value).float).toBe(1 / Wei.Mantissa)
    })

    it('float', async function() {
      const value = 1
      expect(parseFixedPointX64(value).float).toBe(value / FixedPointX64.Mantissa)
    })

    it('percentage', async function() {
      const value = 1
      expect(parseFixedPointX64(value).percentage).toBe(value / FixedPointX64.Mantissa / Percentage.Mantissa)
    })

    it('toString()', async function() {
      const value = 1
      expect(parseFixedPointX64(value).toString()).toBe(FixedPointX64.Denominator.mul(value).toString())
    })
  })

  describe('Percentage', function() {
    it('initializes a fixed point 64x64 integer', async function() {
      const value = new FixedPointX64(toBN('11288117352251203228'))
      expect(value.parsed).toBe(0.6119300678291038)
    })

    it('parsePercentage', async function() {
      const value = 1.25
      expect(parsePercentage(value).raw).toStrictEqual(toBN(value * Percentage.Mantissa))
    })

    it('float', async function() {
      const value = 1.25
      expect(parsePercentage(value).float).toBe(value)
    })

    it('toString()', async function() {
      const value = 1.25
      expect(parsePercentage(value).toString()).toBe(toBN(value * Percentage.Mantissa).toString())
    })
  })

  describe('Time', function() {
    it('initializes a fixed point 64x64 integer', async function() {
      const value = new FixedPointX64(toBN('11288117352251203228'))
      expect(value.parsed).toBe(0.6119300678291038)
    })

    it('parseTime', async function() {
      const value = 1
      expect(parseTime(value).raw).toStrictEqual(Math.floor(value * Time.YearInSeconds))
    })

    it('years', async function() {
      const value = 1
      expect(parseTime(value).years).toBe(value)
    })

    it('seconds', async function() {
      const value = 1
      expect(parseTime(value).seconds).toBe(Math.floor(value * Time.YearInSeconds))
    })

    it('sub', async function() {
      const value = 1
      expect(parseTime(value).sub(1).raw).toBe(Math.floor(value * Time.YearInSeconds) - 1)
    })

    it('toString()', async function() {
      const value = 1
      expect(parseTime(value).toString()).toBe(Math.floor(value * Time.YearInSeconds).toString())
    })
  })

  describe('Utils', function() {
    it('toBN', async function() {
      const value = 1
      expect(toBN(value)).toStrictEqual(BigNumber.from(1))
    })
  })
})
