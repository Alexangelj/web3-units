import { BigNumber } from '@ethersproject/bignumber'
import { toBN } from './utils'

/**
 * @notice Parses a decimal percentage value (e.g. 0.1) into a mantissa scaled Percentage
 * @param percent Value of percentage as a decimal
 * @returns Percentage class with a raw percentage value scaled to Mantissa of 1e4
 */
export const parsePercentage = (percent: number): Percentage => {
  return new Percentage(toBN(percent * Percentage.Mantissa))
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
    return parseFloat(this.raw.toString()) / Percentage.Mantissa
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @return Mantissa used to scale percentages in the smart contracts
   */
  static get Mantissa(): number {
    return Math.pow(10, 4)
  }
}
