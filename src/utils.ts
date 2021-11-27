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
