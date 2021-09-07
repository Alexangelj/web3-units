import { BigNumber } from '@ethersproject/bignumber'
import { toBN } from '../src'

describe('Utils', function() {
  it('toBN', async function() {
    const value = 1
    expect(toBN(value)).toStrictEqual(BigNumber.from(1))
  })
})
