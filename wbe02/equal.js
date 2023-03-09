const equal = (a, b) => {
    return (
      JSON.stringify(a).split('').sort().join('') ===
      JSON.stringify(b).split('').sort().join('')
    );
  };
  
  module.exports = { equal };
  