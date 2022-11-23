const COLOR = ['blue', 'red']
const COLUMNS = 6;
const ROWS = 7; 
let playerOnTurn = 0
let state = Array(6).fill('').map(el => Array(7).fill(''));

function elt (type, attrs, ...children) {
    let node = document.createElement(type)
    for (a in attrs) {
        node.setAttribute(a, attrs[a])
    }
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

function showBoard() {
    let board = document.querySelector('.board');
    let flattenedState = state.flat();
    let flattenedBoard = Array.from(document.querySelector('.board').children).flatMap(c => c.children);
    flattenedState.forEach((color, i) => {
        if(!flattenedBoard[i]) {
            board.appendChild(elt('div', {class:'field'}));
        }
        let child = board.children.item(i).children.item(0);
        let c = elt('div', {class:`${color} piece`})
        c.addEventListener('click', function handleClick() {
            if(getLastEmptyIndexOfColumn(i) < 0) {
                return;
            }
            let index = get2DIndex(i);
            state[index[0]][index[1]] = COLOR[playerOnTurn];
            showBoard();
            playerOnTurn ^= 1;
          });
        child == null ? board.children.item(i).appendChild(c) : board.children.item(i).replaceChild(c, child);
    });
}

function get2DIndex(flattenedIndex) {
    return [getLastEmptyIndexOfColumn(flattenedIndex), flattenedIndex % ROWS]
}

function getLastEmptyIndexOfColumn(flattenedIndex) {
    return state.map((value) => value[flattenedIndex % ROWS]).lastIndexOf('');
}

function startGame() {
    state = Array(6).fill('').map(el => Array(7).fill(''));
    showBoard();
}