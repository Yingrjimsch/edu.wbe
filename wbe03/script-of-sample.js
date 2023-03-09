function scriptOfSample(string, list) {
    return (
      list.find((s) =>
        s.ranges.some(
          (r) => r[0] <= string.charCodeAt(0) && r[1] >= string.charCodeAt(0)
        )
      )?.name || 'unknown'
    );
  }
  module.exports = { scriptOfSample };
  