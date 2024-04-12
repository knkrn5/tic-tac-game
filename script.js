let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';

function makeMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            document.getElementById('winner-message').textContent = `Player ${currentPlayer} wins!`;
        } else if (isBoardFull()) {
            document.getElementById('winner-message').textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('current-player').textContent = `Current Player: ${currentPlayer}`;
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.textContent = board[row][col];
        cell.classList.remove('player-X', 'player-O');
        if (board[row][col] === 'X') {
            cell.classList.add('player-X');
        } else if (board[row][col] === 'O') {
            cell.classList.add('player-O');
        }
    });
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (checkLine(board[i][0], board[i][1], board[i][2]) ||  
            checkLine(board[0][i], board[1][i], board[2][i]) ||  
            (i === 0 && checkLine(board[0][0], board[1][1], board[2][2])) ||  
            (i === 2 && checkLine(board[0][2], board[1][1], board[2][0]))) {  
            return true;
        }
    }
    return false;
}

function checkLine(a, b, c) {
    return a !== '' && a === b && b === c;
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== ''));
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    document.getElementById('current-player').textContent = `Current Player: ${currentPlayer}`;
    document.getElementById('winner-message').textContent = '';
    updateBoard();
}
