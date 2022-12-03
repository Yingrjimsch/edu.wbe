// Server Configurations
const SERVER_URL = 'http://localhost:3000/api/data/state?api-key=c4game';

//let playerOnTurn = 0;
let state = {board: Array(COLUMNS * ROWS).fill(EMPTY_STRING), playerOnTurn: 0, winner: -1}; 

function elt (type, attrs) {
    let node = document.createElement(type)
    for (let a in attrs) {
        node.setAttribute(a, attrs[a])
    }
    return node
}

function getLastEmptyIndexOfColumn(index) {
    const columnNumber = (index + 1) % COLUMNS;
    const columnIndices = state.board.reduce((acc, item, i) => {
        if (item === EMPTY_STRING && (i + 1) % COLUMNS === columnNumber)  acc.push(i);
        return acc;
    }, []);
    return Math.max(...columnIndices);
}

function setButtonListeners() {
    document.getElementById('start-btn').addEventListener('click', newGame);
    document.getElementById('load-btn').addEventListener('click', getState);
    document.getElementById('save-btn').addEventListener('click', saveState);
}

function init() {
    let board = document.querySelector('.board');
    state.board.forEach((c, i) => {
        let chip = elt('div', {class: `piece`});
        chip.addEventListener('click', handleClick, false);
        chip.index = i;
        chip.board = board;
        let square = elt('div', {class: 'field'});
        square.appendChild(chip)
        board.appendChild(square)
    })
}

function handleClick(event) {
    const lastIndex = getLastEmptyIndexOfColumn(event.currentTarget.index)
    if(state.winner >= 0 || lastIndex < 0) return;
    state.board[lastIndex] = COLOR[state.playerOnTurn];
    event.currentTarget.board.children.item(lastIndex).children.item(0).classList.add(COLOR[state.playerOnTurn])
    if(connect4Winner(COLOR[state.playerOnTurn], state.board)) {
        console.log('WINNER IS:', COLOR[state.playerOnTurn]);
        state.winner = state.playerOnTurn;
        return;
    }
    state.playerOnTurn ^= 1;
    console.log('New player on turn:', COLOR[state.playerOnTurn]);
}

function newGame() {
    state.board = Array(COLUMNS * ROWS).fill(EMPTY_STRING);
    state.winner = -1;
    overwritePiecesWithBoard();
}

function loadGame(savedState) {
    state = savedState;
    overwritePiecesWithBoard();
}

function overwritePiecesWithBoard() {
    var pieces = document.getElementsByClassName("piece");
    for (var i = 0; i < pieces.length; i++) {
        pieces.item(i).className = `${state.board[i]} piece`;
    }
}

function saveState() {
    localStorage.setItem('state', JSON.stringify(state));
}

function getState() {
    loadGame(JSON.parse(localStorage.getItem('state')))
}

window.addEventListener("DOMContentLoaded", function() {
    console.log('!!  DOM finished Loading  !!');
    setButtonListeners();
    init();
}, false);