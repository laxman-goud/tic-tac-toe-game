// All possible winning patterns (rows, columns, diagonals)
let winPatterns = [ 
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Initial turn settings
let turn_O = true;      // true: O's turn, false: X's turn
let startTurn = true;   // O always starts first by default

// Player scores
let p1Score = 0, p2Score = 0;

// DOM elements
const boxes = document.getElementsByClassName('box');
const reset = document.getElementById('reset');
const restart = document.getElementById('restart');
const title = document.querySelector('.title');
const p1ScoreEl = document.querySelector('.p1Score');
const p2ScoreEl = document.querySelector('.p2Score');

// Set initial title
title.textContent = "Player O Turn";

// Move counter
let steps = 0;

// Handle box click
const btnClicked = (e) => {
    if (turn_O) {
        e.target.textContent = "O";
        e.target.style.color = '#0D1282'; // O's color
        title.textContent = "Player X Turn";
    } else {
        e.target.textContent = "X";
        e.target.style.color = '#D71313'; // X's color
        title.textContent = "Player O Turn";
    }

    e.target.disabled = true;
    steps++;
    checkWinner(turn_O ? 'O' : 'X');
    turn_O = !turn_O;
};

// Add click listener to all boxes
[...boxes].forEach(box => {
    box.addEventListener('click', btnClicked);
});

// Check if the current player has won
const checkWinner = (player) => {
    for (let pattern of winPatterns) {
        if (
            boxes[pattern[0]].textContent === player &&
            boxes[pattern[1]].textContent === player &&
            boxes[pattern[2]].textContent === player
        ) {
            title.textContent = `Player ${player} wins the game`;
            disableButtons();
            highlightWinner(pattern);
            updateScore(player);
            showRestartButton();
            return;
        }
    }

    // If all 9 moves are made and no winner, it's a draw
    if (steps === 9) {
        title.textContent = "It's a Draw";
        disableButtons();
        showRestartButton();
    }
};

// Highlight winning pattern
function highlightWinner(pattern) {
    for (let index of pattern) {
        boxes[index].style.backgroundColor = '#1CC5DC';
    }
}

// Update score and display
function updateScore(player) {
    if (player === 'O') p1Score++;
    else p2Score++;
    displayScore();
}

// Display current scores
function displayScore() {
    p1ScoreEl.textContent = `Player 1 (O) Score : ${p1Score}`;
    p2ScoreEl.textContent = `Player 2 (X) Score : ${p2Score}`;
}

// Disable all boxes
function disableButtons() {
    [...boxes].forEach(box => box.disabled = true);
}

// Enable all boxes
function enableButtons() {
    [...boxes].forEach(box => box.disabled = false);
}

// Reset button handler (same player starts again)
reset.addEventListener('click', () => {
    turn_O = startTurn;
    title.textContent = turn_O ? "Player O Turn" : "Player X Turn";
    steps = 0;
    clearBoard();
});

// Restart button handler (alternate starting player)
restart.addEventListener('click', () => {
    restart.classList.add('hide');
    reset.classList.remove('hide');
    startTurn = !startTurn;
    turn_O = startTurn;
    title.textContent = turn_O ? "Player O Turn" : "Player X Turn";
    steps = 0;
    clearBoard();
});

// Clear board and enable buttons
function clearBoard() {
    enableButtons();
    [...boxes].forEach(box => {
        box.textContent = "";
        box.style.backgroundColor = '';
    });
}

// Show restart and hide reset
function showRestartButton() {
    reset.classList.add('hide');
    restart.classList.remove('hide');
    steps = 0;
}
