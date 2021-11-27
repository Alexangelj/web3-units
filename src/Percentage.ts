import { BigNumber } from '@ethersproject/bignumber'
import { toBn } from 'evm-bn'

/**
 * @notice Parses a decimal percentage value with a precision up to 4 (e.g. 0.1) into basis points
 * @param percentageDecimal Value of percentage as a decimal
 * @returns Percentage class with a raw percentage value in basis points
 */
export const parsePercentage = (percentageDecimal: number | string): Percentage => {
  const parsed = toBn(percentageDecimal.toString(), Percentage.Mantissa)
  return new Percentage(parsed)
}

/**
 * @notice Handles explicit unit conversion between bps, points, and decimal percentage values
 */
export class Percentage {
  readonly raw: BigNumber
  readonly precision: number = 4

  private _displayDecimals: number = 2

  /**
   * @notice Sets the amount of decimals to use when displaying the formatted value
   */
  set displayDecimals(x: number) {
    this._displayDecimals = x
  }

  /**
   * @return Amount of decimals shown when displaying the formatted value
   */
  get displayDecimals(): number {
    return this._displayDecimals
  }

  /**
   * @param raw  Basis points in BigNumber format
   * */
  constructor(raw: BigNumber) {
    this.raw = raw
  }

  /**
   * @return Utility to return an explicit basis point unit, e.g. 10_000 = 100%
   */
  get bps(): number {
    return this.raw.toNumber()
  }

  /**
   * @return Percentage as a decimal, e.g. 1.00 = 100%
   */
  get float(): number {
    return this.raw.toNumber() / Percentage.BasisPoints
  }

  /**
   * @return Utility to return an explicit percentage point unit, e.g. 1 = 1%
   */
  get points(): number {
    return this.raw.toNumber() / Percentage.Points
  }

  /**
   * @notice Use for displaying the percentage point
   * @return Percentage point with two decimal places, e.g. 10.00 = 10.00%
   */
  get display(): string {
    return this.points.toFixed(this._displayDecimals)
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @return Mantissa used to scale values to basis points
   */
  static get Mantissa(): number {
    return 4
  }

  /**
   * @return Amount of basis points in 100%
   */
  static get BasisPoints(): number {
    return 1e4
  }

  /**
   * @return Amount of points in 100%
   */
  static get Points(): number {
    return 1e2
  }
}
