import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { Percentage } from './Percentage'
import { parseWei, Wei } from './Wei'
import { toBN } from './utils'

/**
 * @notice Parses a regular value into a floating point 64x64 numerator, with 2e64 denominator
 * @dev Do not use for 64x64 int128 values returned by smart contracts. A raw class can be instantiated with that value.
 * @param value An amount
 * @returns Integer class with a raw value that has a denominator of 2e64
 */
export function parseInt64x64(value: BigNumberish): Integer64x64 {
  const x = parseWei(value.toString()) // scale value up so it has high precision
  return new Integer64x64(x.mul(Integer64x64.Denominator).div(parseWei(1)).raw)
}

/**
 *  @notice EVM int128 representation
 */
export class Integer64x64 {
  readonly raw: BigNumber

  /**
   * @notice Int128s are stored as numerators that all have a denominator of 2^64
   * @param raw  An int128 returned from a smart contract call
   * */
  constructor(raw: BigNumber) {
    this.raw = raw
  }

  /**
   * @return Raw divided by 2^64
   */
  get parsed(): number {
    return +this.raw.toString() / +Integer64x64.Denominator.toString()
  }

  /**
   * @return Parsed value floored and divided by 1e18
   */
  get wei(): number {
    return this.parsed / Wei.Mantissa
  }

  /**
   * @return Parsed value floored and divided by 1e9
   */
  get float(): number {
    return this.parsed / Integer64x64.Mantissa
  }

  /**
   * @return Float value divided by 1e4
   */
  get percentage(): number {
    return this.parsed / Percentage.Mantissa
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @return All int128 values in the smart contracts are numerators with a 2^64 denominator
   */
  static get Denominator(): BigNumber {
    return toBN(2).pow(64)
  }

  /**
   * @return Mantissa used to scale uint values in the smart contracts
   */
  static get Mantissa(): number {
    return Math.pow(10, 9)
  }
}
