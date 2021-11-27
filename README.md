# Simple Web3 Units

This packagage includes several classes which extend `ethers.js` with clearer ways to convert between unit types. Not sure which to use for values from smart contract calls? BigNumbers? BigNumberishes? Strings? Numbers? BNs? Simple, just use the `Wei` class. Which has properties to easily convert to any of those types!

# Classes

### Wei

A class representation of a Wei, returned from the EVM. Has getters that easily parse the value into different units with precision customized by decimal amounts.

`parseWei(value, decimals)` is a wrapper around the `parseUnits` function in ethers, it will scale up `value` by `decimals`, and return a Wei instance. Utilizes Paul's `evm-bn` library to convert to a BigNumber.

### FixedPointX64

Typescript representation of a signed 64x64 fixed point integer, a numerator with denominator 2^64, stored as an int128 in solidity.

`parseFixedPointX64(value, decimals)` will scale value up to `decimals`, then multiply it by 2^64, and return a FixedPointX64 instance.

### Percentage

Simple class to represent a percentage unit, with a default mantissa of 4 (used in smart contract).

`parsePercentage(value)` will accept a raw decimal percentage and multiply it by 1e4 and return a Percentage instance.

### Time

Simple class to represent time units, with getters to return seconds or years. Year units are used for javascript math, second units are used for solidity math.
