const spaceBetweenSubArrays = (arr) => arr.map(subArray => subArray.concat(''));
const transform = (arr) => arr[0].map((_, j) => arr.map(row => row[j]));
const stringify = (...arrays) => Array.from(arrays).join(',')
/**
 * 
 * Firstly the diagonals will be accumulated in arrays for / and \
 * / array is accumulated in the first (n+m-1) arrays and \ in the arrays beginning with (n+m-1)
 * Finally the arrays without a 4 will be filtered out.
 */
const getDiagonals = (arr) => arr.reduce((accumulator, currentValue, i) => {
    currentValue.forEach((e, j) => {
        const diag1 = j + i //for diagonals in / way
        const diag2 = j + (arr.length - i - 1) + arr.length + arr[0].length - 1; //for diagonals in \ way            
        if(!accumulator[diag1]) accumulator[diag1] = [];
        if(!accumulator[diag2]) accumulator[diag2] = [];
        accumulator[diag1].unshift(e); 
        accumulator[diag2].unshift(e);
      });
      return accumulator;
    }, []).filter(arr => arr.length >= 4);

function connect4Winner(player, board) {
    const diagonals = spaceBetweenSubArrays(getDiagonals(board));
    const columns = spaceBetweenSubArrays(transform(board));
    const rows = spaceBetweenSubArrays(board);
    const result = stringify(diagonals, columns, rows);
    return result.includes(Array(4).fill(player).join(','));
}

let testBoard = [
    [ '_', '_', '_', '_', '_', '_', '_' ],
    [ '_', '_', '_', '_', '_', '_', '_' ],
    [ '_', '_', '_', '_', 'r', '_', '_' ],
    [ '_', '_', '_', 'r', 'r', 'b', 'b' ],
    [ '_', '_', 'r', 'b', 'r', 'r', 'b' ],
    [ 'b', 'b', 'b', 'r', 'r', 'b', 'b' ]
   ]
console.log(connect4Winner('r', testBoard));
console.log(connect4Winner('b', testBoard))
//module.exports = { connect4Winner }