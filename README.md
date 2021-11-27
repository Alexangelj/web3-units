# Simple Web3 Units

This package includes several classes which extend `ethers.js` with explicit ways to convert between unit types.

Not sure which to use for values from smart contract calls? BigNumbers? BigNumberishes? Strings? Numbers? BNs? The `Wei` class bundles all those types under one roof.

# Classes

### Wei

A class representation of an unsigned integer returned from the EVM. Has getters that easily convert the value into different units with precision customized by decimal amounts.

`parseWei(value, decimals)` is a wrapper around the `toBn` function in `evm-bn`, it will multiply `value` by 10 ^ `decimals` and return a Wei instance.

Use `raw` when passing the value to a smart contract call.

Use `float` when a floating point number is needed, rather than the raw integer.

Use `display` when the value is being shown on a UI.

Check out [Paul's `evm-bn`](https://github.com/paulrberg/evm-bn) library to handle better conversion to BigNumbers from ethers.js.

### FixedPointX64

Typescript representation of a signed 64x64 fixed point integer, a numerator with denominator 2^64, stored as an int128 in solidity.

`parseFixedPointX64(value, decimals)` will scale value up to `decimals`, then multiply it by 2^64, and return a FixedPointX64 instance.

### Percentage

Simple class to represent a percentage unit, with a default precision of 4.

`parsePercentage(value: number | string)` will accept a raw percent in decimal format and multiply it by 10 ^ 4 to construct and return a Percentage instance.

Use `bps` to return the Percentage formatted in basis points.

Use `points` to return the Percentage formatted in points.

Use `float` to return a floating point percentage in decimal format.

Use `display` to return a percentage in point format, with a fixed amount of decimals.

The amount of decimals to `display` can be edited with `displayDecimals(x: number)`, it defaults to 2 otherwise.

### Time

Simple class to represent time units, with getters to return seconds or years.

Year units are used for javascript math, second units are used for solidity math because `block.timestamp` returns a UNIX timestamp in seconds.

Use `float` to return the timestamp.

Use `years` to return the amount of years the amount of seconds is equal to.

Use `seconds` to return the amount of seconds represented.

Use the static method `Time.now` to get a floored timestamp of `Date.now()`, in seconds.
