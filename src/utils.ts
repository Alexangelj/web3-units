import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

/**
 * @notice Converts to a BigNumber
 */
export const toBN = (val: BigNumberish): BigNumber => {
  const floored = Math.floor(+val.toString())
  return BigNumber.from(floored.toString())
}

/**
 * Converts a Big Number to a hex string
 * @param BigNumber
 * @returns bn as a hex string
 */
export function toHex(bn: BigNumber) {
  return bn.toHexString()
}

/**
 * Truncates `wad` to appropriate decimals then converts to a floating point number.
 *
 * @param wad Value to truncate.
 * @param decimals Point of truncation.
 *
 * @beta
 */
export function normalize(wad: number, decimals: number): number {
  const x = Math.trunc(wad * 10 ** decimals) / 10 ** decimals
  return x
}
