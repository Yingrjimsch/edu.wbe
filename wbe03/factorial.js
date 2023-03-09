function factorial(x) {
    const ZERO = typeof x == 'bigint' ? 0n : 0;
    const ONE = typeof x == 'bigint' ? 1n : 1;
    return x < ZERO ? ZERO - ONE : x == ZERO ? ONE : x * factorial(x - ONE);
  }
  
  module.exports = { factorial };
  