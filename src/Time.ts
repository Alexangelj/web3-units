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
   * @return year float value used in javascript math
   */
  get years(): number {
    return this.raw / Time.YearInSeconds
  }

  get seconds(): number {
    return this.raw
  }

  get now(): number {
    return +Date.now() / 1000
  }

  sub(x: BigNumberish | Time): Time {
    x = x.toString()
    return new Time(this.raw - +x.toString())
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @return A year in seconds
   */
  static get YearInSeconds(): number {
    return 31449600
  }
}
