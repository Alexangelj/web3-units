import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

/**
 * @notice Converts to a BigNumber
 */
export const toBN = (val: BigNumberish): BigNumber => {
  return BigNumber.from(val.toString())
}
