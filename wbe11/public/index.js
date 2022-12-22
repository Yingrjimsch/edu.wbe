
let state = {board: Array(COLUMNS * ROWS).fill(EMPTY_STRING), playerOnTurn: 0, winner: -1, clickedChild: undefined}; 
let states = Array(JSON.parse(JSON.stringify(state)));

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
    if(state.winner >= 0 || lastIndex < 0) {
        showPopup(WRONG_TURN_ERROR)
        return;
    };
    changeState(lastIndex);
    event.currentTarget.board.classList.replace(COLOR[state.playerOnTurn] + PULSE_SUFFIX, COLOR[state.playerOnTurn^1] + PULSE_SUFFIX)
    event.currentTarget.board.children.item(lastIndex).children.item(0).classList.add(COLOR[state.playerOnTurn]);
    if(connect4Winner(COLOR[state.playerOnTurn], state.board)) {
        showPopup(WINNER_TEXT + COLOR[state.playerOnTurn], false);
        state.winner = state.playerOnTurn;
        return;
    }
    state.playerOnTurn ^= 1;
    states.push(JSON.parse(JSON.stringify(state)));
}

function changeState(lastIndex) {
    state.clickedChild = lastIndex;
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
    localStorage.setItem('states', JSON.stringify(states));
}

function getState() {
    tempStates = localStorage.getItem('states');
    if(!tempStates) {
        showPopup(LOAD_ERROR);
        return;
    }
    states = JSON.parse(tempStates)
    loadGame(states.at(-1))
}

function undoState() {
    if (states.length <= 1) {
        showPopup(UNDO_ERROR);
        return;
    }
    states.pop();
    state = states.at(-1);
    overwritePiecesWithBoard();
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
    }, 4000)
}

window.addEventListener("DOMContentLoaded", function() {
    console.log('!!  DOM finished Loading  !!');
    setButtonListeners();
    init();
}, false);