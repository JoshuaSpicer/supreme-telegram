// Set up initial game state
let numPlays = 0; // Keep track of the number of moves made
let gameFinished = false; // Flag to indicate whether the game has ended
let currentPlayer = 'X'; // Keep track of which player is currently playing
let currentPlays = { // Object to store moves made by each player
    X: [],
    O: []
};
const winningPositions = [ // List of all possible winning combinations
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// Function to check if the current player has won
function isWinner() {
    if (numPlays < 5) // No player can win before 5 moves have been made
        return false;

    // Iterate through each winning combination
    for (let i = 0; i < winningPositions.length; i++) {
        let isWinner = true;
        // Check if the current player has made all the necessary moves
        for (let j = 0; j < winningPositions[i].length; j++) {
            if (currentPlays[currentPlayer].indexOf(winningPositions[i][j]) === -1) {
                isWinner = false;
                break;
            }
        }
        // If the current player has won, display the winning symbol and alert the winner
        if (isWinner) {
            $('.cell').off('click'); // Disable further clicks on the board
            $(`.cell[data-index=${winningPositions[i][0]}]`).text(currentPlayer).addClass('winner');
            $(`.cell[data-index=${winningPositions[i][1]}]`).text(currentPlayer).addClass('winner');
            $(`.cell[data-index=${winningPositions[i][2]}]`).text(currentPlayer).addClass('winner');
            setTimeout(function () {
                alert(`Winner: ${currentPlayer}`);
            }, 500);
            gameFinished = true; // Set the gameFinished flag to true
            return true;
        }
    }
    // If no player has won, return false
    return false;
}

// Function to check if the game is a draw
function isDraw() {
    if (numPlays === 9 && !isWinner()) {
        setTimeout(function () {
            alert('Game is a draw!');
        }, 500);
        return true;
    }
    return false;
}

function reset() {
    // Clear the board and remove any winner classes
    $('.cell').text('').removeClass('winner');

    // Reset the game state
    numPlays = 0;
    gameFinished = false;
    currentPlayer = 'X';
    currentPlays = {
        X: [],
        O: []
    };
    $('#game-status').text('');
    $('#current-player').text(currentPlayer);

    // Re-enable clicks on the board
    $('.cell').on('click', cellClickHandler);
}

$(document).ready(function () {
    $('.cell').on('click', cellClickHandler);
    $('.reset').on('click', reset);
});


// Set up event listener for clicks on HTML elements with the class 'cell'
$(document).ready(function () {
    $('.cell').on('click', function () {
        if (!gameFinished && $(this).text() === '') { // If the game is still in progress and the clicked cell is empty
            numPlays++; // Increment the number of plays made
            $(this).text(currentPlayer); // Add the current player's symbol to the clicked cell
            currentPlays[currentPlayer].push(parseInt($(this).attr('data-index'))); // Add the move to the current player's list of moves

            if (isDraw()) { // Check if the game is a draw
                gameFinished = true; // Set the gameFinished flag to true
                $('#game-status').text('Game is a draw!'); // Update game status
                return; // Stop execution
            }

            if (isWinner()) { // Check if the current player has won
                gameFinished = true; // Set the gameFinished flag to true
                return; // If so, stop execution
            }

            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Switch to the other player
            $('#current-player').text(currentPlayer); // Update current player text
        }
    });
});

