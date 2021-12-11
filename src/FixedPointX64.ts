import { BigNumber, BigNumberish, parseFixed } from '@ethersproject/bignumber'
import { Percentage } from './Percentage'
import { Wei } from './Wei'
import { toBN } from './utils'
import { toBn } from 'evm-bn'

/**
 * @notice Parses a regular value into a signed fixed point 64x64 integer, with 2^64 denominator
 * @dev Do not use for 64x64 int128 values returned by smart contracts. A raw class can be instantiated with that value.
 * @param value Unsigned value which will be multiplied by 2^64
 * @returns Signed fixed point 64.64 Integer class
 */
export function parseFixedPointX64(value: BigNumberish | Wei, decimals: number = 18): FixedPointX64 {
  if (value instanceof Wei) decimals = value.decimals
  value = value.toString()
  if (Math.sign(+value) < 0) throw new Error(`Attempting to parse signed value: ${value}`)
  if (+value > Math.pow(2, 64 - 1)) throw new Error(`Attempting to parse too large of a number: ${value}`)
  const number: BigNumber = toBn(value, 18).div(parseFixed('1', 18))
  return new FixedPointX64(FixedPointX64.Denominator.mul(number), decimals)
}

/**
 *  @notice Signed fixed point 64.64 number scaled to `decimals` of precision
 */
export class FixedPointX64 {
  readonly raw: BigNumber
  readonly decimals: number

  /**
   * @param fixedPointX64 Raw fixed point string value
   * @param decimals Amount of decimals of the fixed point number
   * @returns FixedPointX64 class instance
   */
  public static from(fixedPointX64: string, decimals = 18): FixedPointX64 {
    const number: BigNumber = toBn(fixedPointX64, 18).div(parseFixed('1', 18))
    return new FixedPointX64(number, decimals)
  }

  /**
   * @notice Int128s are stored as numerators that all have a denominator of 2^64
   * @param raw  Signed fixed point 64.64 integer
   * @param decimals Mantissa to scale down by to get float value
   * */
  constructor(raw: BigNumber, decimals: number = 18) {
    this.raw = raw
    this.decimals = decimals
  }

  /**
   * @return Converts a raw fixed point 64.64 to a regular value
   */
  get parsed(): number {
    return +this.raw.toString() / +FixedPointX64.Denominator.toString()
  }

  /**
   * @return Parsed value floored and scaled down by 10**decimals
   */
  get float(): number {
    return this.parsed / Math.pow(10, this.decimals)
  }

  /**
   * @return Formatted value to be used to display the value in a human-readable format
   */
  get display(): string {
    return this.float.toFixed(2)
  }

  /**
   * @return Float value divided by 1e4, the precision of Percentage values
   */
  get percentage(): number {
    return this.parsed / Math.pow(10, Percentage.Mantissa)
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
}
