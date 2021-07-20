# Simple Web3 Units

This packagage includes several classes which extend `ethers.js` with clearer ways to convert between unit types. Not sure which to use for values from smart contract calls? BigNumbers? BigNumberishes? Strings? Numbers? BNs? Simple, just use the `Wei` class. Which has properties to easily convert to any of those types!

# Classes

### Wei

A class representation of a Wei, returned from the EVM. Has getters that easily parse the value into different units.

### Integer64x64

Typescript representation of a 64x64 floating point number, a numerator with denominator 2e64, stored as an int128 in solidity.

### Percentage

Simple class to represent a percentage unit, with a default mantissa of 1e4 (used in smart contract).

### Time

Simple class to represent time units, with getters to return seconds or years. Year units are used for javascript math, second units are used for solidity math.
