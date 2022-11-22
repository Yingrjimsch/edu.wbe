const COLOR = ['blue', 'red']
const COLUMNS = 6;
const ROWS = 7; 
let state = Array(6).fill('').map(el => Array(7).fill(''))

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

function changeByInterval() {
    let randomColor = Math.floor(Math.random() * (COLOR.length + 1));
    let randomState = Math.floor(Math.random() * COLUMNS * ROWS);
    let y = randomState == 0 ? 0 : Math.trunc(randomState / ROWS)
    let x = (randomState % ROWS)

    let color = randomColor < 2 ? COLOR[randomColor][0] : '';
    state[y][x] = color
    showBoard();
}

function showBoard() {
    let board = document.querySelector('.board');
    let flattenedState = state.flat();
    let flattenedBoard = Array.from(document.querySelector('.board').children).flatMap(c => c.children);
    flattenedState.forEach((s, i) => {
        if(!flattenedBoard[i]) {
            board.appendChild(elt('div', {class:'field'}));
        }
        let child = board.children.item(i).children.item(0);
        let color = s == 'r' ? COLOR[1] : s == 'b' ? COLOR[0] : '';
        let c = elt('div', {class:`${color} piece`})
        child == null ? board.children.item(i).appendChild(c) : board.children.item(i).replaceChild(c, child)
    })
}