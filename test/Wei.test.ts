import { parseEther, parseUnits } from '@ethersproject/units'
import { parseWei, Wei, toBN } from '../src'

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

  it('parseWei#default', async function() {
    const amount = 1
    const value = parseWei(amount)
    expect(value.raw).toStrictEqual(parseEther(amount.toString()))
    expect(value.float).toBe(amount)
    expect(value.parsed).toBe('1.0')
    expect(value.gt(parseEther('2'))).toBe(false)
    expect(value.gt(parseEther('0.5'))).toBe(true)
  })

  it('parseWei#0 decimals', async function() {
    const decimals = 0
    const amount = 2
    const value = parseWei(amount, decimals)
    expect(value.raw).toStrictEqual(parseUnits(amount.toString(), decimals))
    expect(value.float).toBe(amount)
    expect(value.parsed).toBe(amount.toString())
    expect(value.gt(parseUnits('3', decimals))).toBe(false)
    expect(value.gt(parseUnits('1', decimals))).toBe(true)
  })

  it('Wei#add', async function() {
    const value = new Wei(toBN(1))
    expect(+value.add(1).toString()).toBe(2)
  })

  it('Wei#sub', async function() {
    const value = new Wei(toBN(2))
    expect(+value.sub(1).toString()).toBe(1)
  })

  it('Wei#mul', async function() {
    const value = new Wei(toBN(1))
    expect(+value.mul(2).toString()).toBe(2)
  })

  it('Wei#div', async function() {
    const value = new Wei(toBN(2))
    expect(+value.div(2).toString()).toBe(1)
  })

  it('Wei#gt', async function() {
    const value = new Wei(toBN(2))
    expect(value.gt(1)).toBe(true)
  })

  it('Wei#lt', async function() {
    const value = new Wei(toBN(2))
    expect(value.lt(3)).toBe(true)
  })

  it('Wei#gte', async function() {
    const value = new Wei(toBN(2))
    expect(value.gte(2)).toBe(true)
  })

  it('Wei#lte', async function() {
    const value = new Wei(toBN(3))
    expect(value.lte(3)).toBe(true)
  })

  it('Mantissa', async function() {
    expect(Wei.Mantissa).toBe(18)
  })
})
