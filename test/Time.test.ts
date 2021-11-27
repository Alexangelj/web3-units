import { parseTime, Time } from '../src'

describe('Time', function() {
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

  it('float', async function() {
    const value = 1
    expect(parseTime(value).float).toBe(Math.floor(value * Time.YearInSeconds))
  })

  it('add', async function() {
    const value = 1
    expect(parseTime(value).add(1).raw).toBe(Math.floor(value * Time.YearInSeconds) + 1)
  })

  it('sub', async function() {
    const value = 1
    expect(parseTime(value).sub(1).raw).toBe(Math.floor(value * Time.YearInSeconds) - 1)
  })

  it('gt', async function() {
    const value = 1
    expect(parseTime(value).gt(0)).toBe(true)
  })

  it('gte', async function() {
    const value = 1
    expect(parseTime(value).gte(1)).toBe(true)
  })

  it('lt', async function() {
    const value = 1
    expect(parseTime(value).gt(2)).toBe(true)
  })

  it('lte', async function() {
    const value = 1
    expect(parseTime(value).lte(Math.floor(value * Time.YearInSeconds))).toBe(true)
  })

  it('eq', async function() {
    const value = 1
    expect(parseTime(value).eq(Math.floor(value * Time.YearInSeconds))).toBe(true)
  })

  it('isZero', async function() {
    const value = 0
    expect(parseTime(value).isZero()).toBe(true)
  })

  it('toString()', async function() {
    const value = 1
    expect(parseTime(value).toString()).toBe(Math.floor(value * Time.YearInSeconds).toString())
  })
})
