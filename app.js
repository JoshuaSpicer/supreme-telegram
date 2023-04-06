let numPlays = 0;
let gameFinished = false;
let currentPlayer = 'X';
let currentPlays = {
    X: [],
    O: []
};
const winningPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function isWinner() {
    if (numPlays < 5)
        return false;

    for (let i = 0; i < winningPositions.length; i++) {
        let isWinner = true;
        for (let j = 0; j < winningPositions[i].length; j++) {
            if (currentPlays[currentPlayer].indexOf(winningPositions[i][j]) === -1) {
                isWinner = false;
                break;
            }
        }
        if (isWinner) {
            gameFinished = true;
            alert('Winner: ' + currentPlayer);
            return true;
        }
    }
    if (!gameFinished && isDraw()) {
        alert('Draw!');
        return true;
    }
    return false;
}

function isDraw() {
    return numPlays === 9;
}

$(document).ready(function () {
    $('.cell').on('click', function () {
        if (!gameFinished && $(this).text() === '') {
            numPlays++;
            $(this).text(currentPlayer);
            currentPlays[currentPlayer].push(parseInt($(this).attr('data-index')));
            if (isWinner()) {
                return;
            }
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    });
});
