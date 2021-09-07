import { FixedPointX64, parseTime, Time, toBN } from '../src'

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
