import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { fromBn } from 'evm-bn'
import { toBn } from 'evm-bn'

/**
 * @notice Multiplies by 10**decimals and returns a Wei instance of the value
 * @param  x Amount to parse to raw wei value
 * @param  decimals Amount of precision that the raw wei value would have
 */
export function parseWei(x: BigNumberish, decimals: number = 18): Wei {
  const bn = toBn(x.toString(), decimals)
  return new Wei(bn, decimals)
}

/**
 * @notice Represents an EVM unsigned integer
 */
export class Wei {
  /**
   * @notice Integer BigNumber used in/from EVM calls
   */
  readonly raw: BigNumber
  /**
   * @notice Tokens in the EVM scale their value amounts by their decimals
   */
  readonly decimals: number

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
   * @param raw  Value used or returned during smart contract calls for uints
   * @param decimals If we need a regular decimal value, how much would we divide by?
   * */
  constructor(raw: BigNumber, decimals: number = 18) {
    this.raw = raw
    this.decimals = decimals
  }

  get hex(): string {
    return this.raw._hex
  }

  /**
   * @return Raw BigNumber formatted to a decimal value as a string
   */
  get format(): string {
    return fromBn(this.raw, this.decimals)
  }

  /**
   * @return Floating number formatted from raw wei value
   */
  get float(): number {
    return parseFloat(this.format)
  }

  /**
   * @return Formatted value to be used when displaying it
   */
  get display(): string {
    return this.float.toFixed(this._displayDecimals)
  }

  add(x: BigNumberish | Wei): Wei {
    return new Wei(this.raw.add(x.toString()), this.decimals)
  }

  sub(x: BigNumberish | Wei): Wei {
    return new Wei(this.raw.sub(x.toString()), this.decimals)
  }

  mul(x: BigNumberish | Wei): Wei {
    return new Wei(this.raw.mul(x.toString()), this.decimals)
  }

  div(x: BigNumberish | Wei): Wei {
    if (+x.toString() <= 0) throw Error('Attempting to divide by 0 or negative')
    return new Wei(this.raw.div(x.toString()), this.decimals)
  }

  gt(x: BigNumberish | Wei): boolean {
    return this.raw.gt(x.toString())
  }

  lt(x: BigNumberish | Wei): boolean {
    return this.raw.lt(x.toString())
  }

  gte(x: BigNumberish | Wei): boolean {
    return this.raw.gte(x.toString())
  }

  lte(x: BigNumberish | Wei): boolean {
    return this.raw.lte(x.toString())
  }

  eq(x: BigNumberish | Wei): boolean {
    return this.raw.eq(x.toString())
  }

  log() {
    console.log(this.display)
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @return Default decimals
   */
  static get Mantissa(): number {
    return 18
  }
}
