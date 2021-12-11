import { FixedPointX64, parseFixedPointX64, parseWei, Percentage, toBN } from '../src'

describe('FixedPointX64', function() {
  it('initializes a fixed point 64x64 integer', async function() {
    const value = new FixedPointX64(toBN('11288117352251203228'))
    expect(value.parsed).toBe(0.6119300678291038)
  })

  it('from', async function() {
    const value = FixedPointX64.from('3.345867008995041e+57')
    expect(+value.raw.toString()).toEqual(+'3.345867008995041e+57')
  })

  it('parseFixedPointX64', async function() {
    const value = 1
    expect(parseFixedPointX64(value).parsed).toBe(1)
  })

  it('parseFixedPointX64#Wei value', async function() {
    const value = parseWei(1)
    expect(parseFixedPointX64(value).parsed).toBe(+value.raw)
  })

  it('parseFixedPointX64#throw on signed value', async function() {
    const value = -1
    expect(() => parseFixedPointX64(value)).toThrowError('')
  })

  it('parseFixedPointX64#throw on max value', async function() {
    const value = Math.pow(2, 64)
    expect(() => parseFixedPointX64(value)).toThrowError()
  })

  it('raw', async function() {
    const value = 1
    expect(parseFixedPointX64(value).raw.toString()).toBe(FixedPointX64.Denominator.toString())
  })

  it('float', async function() {
    const value = 1
    expect(parseFixedPointX64(value).float).toBe(1e-18)
  })

  it('percentage', async function() {
    const amount = 1000
    const value = parseFixedPointX64(amount, 0)
    expect(value.percentage).toBe(amount / Math.pow(10, Percentage.Mantissa))
  })

  it('toString()', async function() {
    const value = 1
    expect(parseFixedPointX64(value).toString()).toBe(FixedPointX64.Denominator.mul(value).toString())
  })
})
