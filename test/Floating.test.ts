import { MaxUint256 } from '@ethersproject/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { Floating } from '../src/Floating'

describe('Floating', function() {
  let flo: Floating

  beforeEach(async function() {
    flo = Floating.from(1)
  })

  it('#truncates properly', async function() {
    const lowDecimalFloating = Floating.from(2, 2) // 2.00
    expect((2 * 4) / 3).toBeGreaterThan(2.66)
    expect(lowDecimalFloating.mulDiv(4, 3).normalized).toBeLessThan((2 * 4) / 3)
    expect(lowDecimalFloating.mulDiv(4, 3).normalized).toStrictEqual(2.66)
  })

  it('#INFINITY', async function() {
    expect(Floating.INFINITY.eq(BigNumber.from(MaxUint256))).toBe(true)
  })
  it('#ZERO', async function() {
    expect(Floating.ZERO.raw).toEqual(0)
  })
  it('#ONE', async function() {
    expect(Floating.ONE.raw).toEqual(1)
  })
  it('#HALF', async function() {
    expect(Floating.HALF.raw).toEqual(0.5)
  })
  it('#isInfinity', async function() {
    expect(flo.isInfinity).toBe(false)
  })
  it('#raw', async function() {
    expect(flo.raw).toEqual(1)
  })
  it('#normalized', async function() {
    expect(flo.normalized).toEqual(1)
  })
  it('#scaleFactor', async function() {
    expect(flo.scaleFactor).toEqual(10 ** 18)
  })
  it('#scaled', async function() {
    expect(flo.scaled).toEqual(Math.floor(1 * 10 ** 18))
  })
  it('#upscaleInteger', async function() {
    expect(flo.upscaleInteger(1)).toEqual(flo.scaled)
  })
  it('#downscaleInteger', async function() {
    expect(flo.downscaleInteger(flo.scaled)).toEqual(1)
  })
  it('#toString', async function() {
    expect(flo.toString()).toEqual('1')
  })
  it('#toFixed', async function() {
    expect(flo.toFixed(2)).toEqual('1.00')
  })
  it('#add', async function() {
    expect(flo.add(1).raw).toEqual(2)
  })
  it('#sub', async function() {
    expect(flo.sub(1).raw).toEqual(0)
  })
  it('#mul', async function() {
    expect(flo.mul(2).raw).toEqual(2)
  })
  it('#mulDiv', async function() {
    expect(flo.mulDiv(2, 2).raw).toEqual(1)
  })
  it('#div', async function() {
    expect(flo.div(4).raw).toEqual(0.25)
  })
})
