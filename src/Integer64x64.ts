import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { Percentage } from './Percentage'
import { Wei } from './Wei'
import { toBN } from './utils'

/**
 * @notice Parses a regular value into a floating point 64x64 numerator, with 2e64 denominator
 * @param value Uint value not in wei
 * @returns Integer class with a raw value that has a denominator of 2e64
 */
export function parseInt64x64(value: BigNumberish): Integer64x64 {
  return new Integer64x64(Integer64x64.Denominator.mul(value.toString()))
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
   * @return Parsed value with `MANTISSA` decimals as an integer
   */
  get integer(): number {
    return Math.floor(this.parsed * Wei.Mantissa)
  }

  /**
   * @return Parsed value floored and with MANTISSA decimals
   */
  get float(): number {
    return this.integer / Wei.Mantissa
  }

  /**
   * @return float value in units of percentages
   */
  get percentage(): number {
    return this.float / Percentage.Mantissa
  }

  /**
   * @return All int128 values in the smart contracts are numerators with a 2^64 denominator
   */
  static get Denominator(): BigNumber {
    return toBN(2).pow(64)
  }
}
