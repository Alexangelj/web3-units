import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'

/**
 * @notice Multiplies by 10**decimals and returns a Wei instance of the value
 * @param  x Amount to parse to raw wei value
 * @param  decimals Amount of precision that the raw wei value would have
 */
export const parseWei = (x: BigNumberish, decimals: number = 18): Wei => {
  return new Wei(parseUnits(x.toString(), decimals), decimals)
}

/**
 * @notice EVM Uint representation for wei values
 */
export class Wei {
  readonly raw: BigNumber
  readonly decimals: number

  /**
   * @param raw  Value used or returned during smart contract calls for uints
   * @param decimals If we need a regular decimal value, how much would we divide by?
   * */
  constructor(raw: BigNumber, decimals: number = 18) {
    this.raw = raw
    this.decimals = decimals
  }

  get parsed(): string {
    return formatUnits(this.raw, this.decimals)
  }

  /**
   * @return Float value used in smart contract calls
   */
  get float(): number {
    return parseFloat(this.parsed)
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
    if (+x.toString() <= 0) return parseWei('0')
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

  log() {
    console.log(this.parsed)
  }

  toString(): string {
    return this.raw.toString()
  }

  /**
   * @return Mantissa used to scale uint values in the smart contracts
   */
  static get Mantissa(): number {
    return 18
  }
}
