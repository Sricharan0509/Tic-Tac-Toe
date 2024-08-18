let numPlays = 0;
let gameFinished = false;
let currentPlayer = 'O';
let currentPlays = {
    X: [],
    O: []
}


$(document).ready(function () {

    $(".box").click(function () {

        if (!gameFinished) {
            numPlays++;

            if ($.trim($(this).text()) === "") {
                $(this).text(currentPlayer);
                currentPlays[currentPlayer].push(parseInt($(this).attr('data-index')));
            }
            else {
                $(this).off("click");
            }


            if (isWinner()) {
                gameResult('win');
            }

            if (!gameFinished && isDraw()) {
                gameResult('draw');

            }
            // Logic to switch turns
            if (currentPlayer === 'O') {
                currentPlayer = 'X';

            }
            else {
                currentPlayer = 'O';

            }

        }

    });

});


function gameResult(type) {
    gameFinished = true;
    if (type == 'win') {
        $('.gamestatus').text(currentPlayer + ' wins the game');
        
    }
    else {
        $('.gamestatus').text('The game is DRAW!');

    }
}

function playAgain() {
    numPlays = 0;
    gameFinished = false;
    currentPlayer = 'O';
    currentPlays = {
        X: [],
        O: []
    }
    $(".box, .gamestatus").text('');

}

function isDraw() {
    return numPlays == 9;

}
function isWinner() {
    if (numPlays < 5) {
        return;
    }

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
    for (let i = 0; i < winningPositions.length; i++) {
        let isWinner = true;
        for (let j = 0; j < winningPositions[i].length; j++) {
            if ($.inArray(winningPositions[i][j], currentPlays[currentPlayer]) < 0) {
                isWinner = false;
                break;
            }
        }

        if (isWinner) {
            return true;
        }

    }
    return false;
}
