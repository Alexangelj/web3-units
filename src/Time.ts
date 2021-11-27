import { BigNumberish } from '@ethersproject/bignumber'

/**
 * @notice Parses a time unit of years into a Time class
 * @param years Time in years
 * @returns Time class which has `raw` as seconds
 */
export const parseTime = (years: number): Time => {
  return new Time(years * Time.YearInSeconds)
}

/**
 * @notice Used to return seconds or years, default is seconds
 */
export class Time {
  readonly raw: number
  /**
   * @param raw  Integer value in seconds used or returned during smart contract calls
   * */
  constructor(raw: number) {
    this.raw = Math.floor(raw) // seconds
  }

  /**
   * @return seconds float value used in smart contracts (e.g. block.timestamp)
   */
  get float(): number {
    return this.raw
  }

  /**
   * @return year float value used in javascript math
   */
  get years(): number {
    return this.raw / Time.YearInSeconds
  }

  /**
   * @return seconds float value used in smart contracts (e.g. block.timestamp)
   */
  get seconds(): number {
    return this.raw
  }

  /**
   * @return Current date timestamp in seconds
   */
  public static now(): number {
    return Math.floor(+Date.now() / 1000)
  }

  add(x: BigNumberish | Time): Time {
    x = x.toString()
    return new Time(this.raw + +x.toString())
  }

  sub(x: BigNumberish | Time): Time {
    x = x.toString()
    return new Time(this.raw - +x.toString())
  }

  gt(x: BigNumberish | Time): boolean {
    x = parseFloat(x.toString())
    return this.raw > x
  }

  gte(x: BigNumberish | Time): boolean {
    x = parseFloat(x.toString())
    return this.raw >= x
  }

  lt(x: BigNumberish | Time): boolean {
    x = parseFloat(x.toString())
    return this.raw < x
  }

  lte(x: BigNumberish | Time): boolean {
    x = parseFloat(x.toString())
    return this.raw <= x
  }

  eq(x: BigNumberish | Time): boolean {
    x = parseFloat(x.toString())
    return this.raw === x
  }

  isZero(): boolean {
    return this.raw === 0
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @notice ~365.24 days
   * @return A year in seconds
   */
  static get YearInSeconds(): number {
    return 31556925
  }
}
