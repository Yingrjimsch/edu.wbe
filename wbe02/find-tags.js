const findTag = (a) => {
    return JSON.stringify(a).match('<(((?!<|/\s).)*)>')[0];
  };
    
module.exports = { findTag };
  