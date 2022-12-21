let states = []
let state = {board: Array(COLUMNS * ROWS).fill(EMPTY_STRING), playerOnTurn: 0, winner: -1, clickedChild: undefined}; 

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
    document.getElementById('undo-btn').addEventListener('click', undoState);
}

function init() {
    let board = document.querySelector('.board');
    state.board.forEach((c, i) => {
        let chip = elt('div', {class: `piece`});
        chip.addEventListener('click', handleClick, false);
        chip.index = i;
        chip.board = board;
        let square = elt('div', {class: 'field'});
        square.appendChild(chip);
        board.appendChild(square);
    })
}

function handleClick(event) {
    const lastIndex = getLastEmptyIndexOfColumn(event.currentTarget.index);
    if(state.winner >= 0 || lastIndex < 0) return;
    changeState(lastIndex);
    event.currentTarget.board.classList.replace(COLOR[state.playerOnTurn] + '-pulse', COLOR[state.playerOnTurn^1] + '-pulse')
    event.currentTarget.board.children.item(lastIndex).children.item(0).classList.add(COLOR[state.playerOnTurn]);
    if(connect4Winner(COLOR[state.playerOnTurn], state.board)) {
        showPopup(WINNER_TEXT + COLOR[state.playerOnTurn], false);
        state.winner = state.playerOnTurn;
        return;
    }
    state.playerOnTurn ^= 1;
}

function changeState(lastIndex) {
    state.clickedChild = lastIndex;
    states.push(JSON.parse(JSON.stringify(state)));
    state.board[lastIndex] = COLOR[state.playerOnTurn];
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
    tempState = localStorage.getItem('state');
    if(!tempState) {
        showPopup(LOAD_ERROR);
        return;
    }
    loadGame(JSON.parse(tempState))
}

function undoState() {
    if (states.length <= 0) {
        showPopup(UNDO_ERROR);
        return;
    }
    state = states.pop();
    document.querySelector('.board').children.item(state.clickedChild).children.item(0).classList.remove(COLOR[state.playerOnTurn])
}

function showPopup(text, error=true) {
    popup = document.getElementById('popup');
    popup.querySelector('p').innerText = text;
    popup.querySelector('img').src = error ? 
        ERROR_GIFS[Math.floor(Math.random() * ERROR_GIFS.length)] :
        WINNER_GIFS[Math.floor(Math.random() * WINNER_GIFS.length)];
    popup.classList.replace('hidden-popup', 'visible-popup');
    setTimeout(function() {
        popup.classList.replace('visible-popup', 'hidden-popup');
    }, 3000)
}

window.addEventListener("DOMContentLoaded", function() {
    console.log('!!  DOM finished Loading  !!');
    setButtonListeners();
    init();
}, false);