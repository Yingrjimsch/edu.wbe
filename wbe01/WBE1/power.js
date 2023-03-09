const assert = require('assert');

const power = (x, n) => {
  assert(Number.isInteger(n + x) && n >= 0);
  return n == 0 ? 1 : n % 2 != 0 ? x * power(x, --n) : power(x, n / 2) ** 2;
};

module.exports = { power };
