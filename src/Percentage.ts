import { BigNumber } from '@ethersproject/bignumber'
import { toBn } from 'evm-bn'

/**
 * @notice Parses a float percentage value with up to 4 decimals (e.g. 0.1) into a mantissa scaled Percentage
 * @param percent Value of percentage as a float
 * @returns Percentage class with a raw percentage value scaled by 1e4
 */
export const parsePercentage = (percent: number): Percentage => {
  return new Percentage(toBn(percent.toString(), 4))
}

/**
 * @notice EVM percentage representation (values scaled by percentage constant)
 */
export class Percentage {
  readonly raw: BigNumber

  /**
   * @param raw  A scaled percentage value used or returned during smart contract calls
   * */
  constructor(raw: BigNumber) {
    this.raw = raw
  }

  /**
   * @return Float value used in javascript math
   */
  get float(): number {
    return this.raw.toNumber() / Math.pow(10, Percentage.Mantissa)
  }

  /**
   * @return Float value as a string used to display
   */
  get parsed(): string {
    return this.float.toFixed(2)
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @return Mantissa used to scale percentages in the smart contracts
   */
  static get Mantissa(): number {
    return 4
  }
}
