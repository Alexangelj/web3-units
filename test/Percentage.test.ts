import { parsePercentage, Percentage, toBN } from '../src'

describe('Percentage', function() {
  it('parsePercentage', async function() {
    const value = 1.25
    expect(parsePercentage(value).raw._hex).toStrictEqual(
      toBN(Math.floor(value * Math.pow(10, Percentage.Mantissa)))._hex
    )
  })

  it('float', async function() {
    const value = 1.25
    expect(parsePercentage(value).float).toBe(value)
  })

  it('bps', async function() {
    const value = 1.25
    expect(parsePercentage(value).bps).toBe(value * Percentage.BasisPoints)
  })

  it('points', async function() {
    const value = 1.25
    expect(parsePercentage(value).points).toBe(value * Percentage.Points)
  })

  it('display', async function() {
    const value = 1.25
    expect(parsePercentage(value).display).toBe((value * Percentage.Points).toFixed(2))
  })

  it('toString()', async function() {
    const value = 1.25
    expect(parsePercentage(value).toString()).toBe(toBN(value * Math.pow(10, Percentage.Mantissa)).toString())
  })
})
