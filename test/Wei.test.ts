import { parseEther, parseUnits } from '@ethersproject/units'
import { toBn } from 'evm-bn'
import { parseWei, Wei, toBN } from '../src'

describe('Wei', function() {
  it('initializes a new Wei', async function() {
    const one = parseEther('1')
    const value = new Wei(one)
    expect(value.raw._hex).toStrictEqual(one._hex)
    expect(value.float).toBe(1)
    expect(value.display).toBe('1.00')
    expect(value.gt(parseEther('2'))).toBe(false)
    expect(value.gt(parseEther('0.5'))).toBe(true)
  })

  it('parseWei#default', async function() {
    const amount = 1
    const value = parseWei(amount)
    expect(value.raw._hex).toStrictEqual(parseEther(amount.toString())._hex)
    expect(value.float).toBe(amount)
    expect(value.display).toBe('1.00')
    expect(value.gt(parseEther('2'))).toBe(false)
    expect(value.gt(parseEther('0.5'))).toBe(true)
  })

  it('parseWei#decimal value', async function() {
    const amount = 1.043534563463461132123123121231
    const value = parseWei(amount, 18)
    expect(value.raw._hex).toStrictEqual(toBn(amount.toString(), 18)._hex)
  })

  it('parseWei#scientific notation', async function() {
    const amount = 1.04353e-7
    const value = parseWei(amount)
    expect(value.raw._hex).toStrictEqual(toBn(amount.toString())._hex)
  })

  it('parseWei#string', async function() {
    const amount = '120120556345.312315'
    const value = parseWei(amount)
    expect(value.raw._hex).toStrictEqual(toBn(amount.toString())._hex)
  })

  it('parseWei#1 decimals', async function() {
    const decimals = 1
    const amount = 2
    const value = parseWei(amount, decimals)
    expect(value.raw._hex).toStrictEqual(toBn(amount.toString(), decimals)._hex)
    expect(value.float).toBe(amount)
    expect(value.display).toBe(amount.toFixed(value.displayDecimals))
    expect(value.gt(parseUnits('3', decimals))).toBe(false)
    expect(value.gt(parseUnits('1', decimals))).toBe(true)
  })

  it('parseWei# does not underflow if too many decimals beyond specified', async function() {
    const decimals = 6
    const amount = 2.123254253465653463463463461123
    const value = parseWei(amount, decimals)
    expect(value.raw._hex).toStrictEqual(toBn(amount.toString(), decimals)._hex)
    expect(value.float).toBe(Math.floor(amount * 10 ** decimals) / 10 ** decimals)
    expect(value.display).toBe(amount.toFixed(value.displayDecimals))
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
