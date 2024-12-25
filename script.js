const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restart');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winner-message');
const closePopupButton = document.getElementById('close-popup');
const xWinsLabel = document.getElementById('xWins');
const oWinsLabel = document.getElementById('oWins');

let isXTurn = true;
let xWins = 0;
let oWins = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    let winner = null;

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (
            cells[a].classList.contains('x') &&
            cells[b].classList.contains('x') &&
            cells[c].classList.contains('x')
        ) {
            winner = 'X';
        } else if (
            cells[a].classList.contains('o') &&
            cells[b].classList.contains('o') &&
            cells[c].classList.contains('o')
        ) {
            winner = 'O';
        }
    });

    if (winner) {
        showPopup(winner);
        if (winner === 'X') xWins++;
        if (winner === 'O') oWins++;
        updateScoreboard();
        resetBoard();
    } else if (Array.from(cells).every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        showPopup('Draw');
        resetBoard();
    }
}

function showPopup(winner) {
    winnerMessage.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
    popup.classList.remove('hidden');
}

function updateScoreboard() {
    xWinsLabel.textContent = xWins;
    oWinsLabel.textContent = oWins;
}

function resetBoard() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    isXTurn = true;
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
            cell.classList.add(isXTurn ? 'x' : 'o');
            cell.textContent = isXTurn ? 'X' : 'O';
            checkWinner();
            isXTurn = !isXTurn;
        }
    });
});

restartButton.addEventListener('click', resetBoard);

closePopupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
});
