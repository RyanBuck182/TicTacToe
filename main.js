let cellElements = document.getElementsByClassName("cell");
let resetButton = document.getElementById("reset");
let gameStatus = document.getElementById("status");

function makeEmptyBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = "";
    }
    return board;
}

let board = makeEmptyBoard();

/**
 * @type {"X" | "O"}
*/
let currentPlayer = "X";

/**
 * @type {"X" | "O" | "TIE" | "N/A"}
 */
let winner = "N/A";

/**
 * @param {"X" | "O"} player 
 */
function setCurrentPlayer(player) {
    currentPlayer = player;
    gameStatus.innerHTML = currentPlayer + "'s Turn";
}

/**
 * @param {number} id
 * @param {Element} cell
 * @param {"X" | "O"} player
 */
function setBoardSpace(id, cell, player) {
    board[id] = player;
    cell.innerHTML = board[id];
}

resetButton.onclick = function() {
    board = makeEmptyBoard();
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].innerHTML = board[i];
    }
    setCurrentPlayer("X");
    winner = "N/A";
}

for (let i = 0; i < cellElements.length; i++) {
    let element = cellElements[i];
    
    element.onclick = () => {
        if (board[i] === "" && winner === "N/A") {
            setBoardSpace(i, element, currentPlayer);
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

            let filledSpaces = 0;
            for (let i = 0; i < board.length; i++) {
                if (board[i] == "")
                    continue;

                filledSpaces++;
                
                if ((i + 2) % 3 === 0) {
                    let horizontalWin = board[i-1] === board[i] && board[i] === board[i+1];
                    if (horizontalWin)
                        winner = board[i];
                }

                if (i >= 3 && i <= 5) {
                    let verticalWin = board[i-3] === board[i] && board[i] === board[i+3];
                    if (verticalWin)
                        winner = board[i];
                }

                if (i === 4) {
                    let diagonalWin = (board[i-4] === board[i] && board[i] === board[i+4])
                                    || (board[i-2] === board[i] && board[i] === board[i+2]);
                    if (diagonalWin)
                        winner = board[i];
                }
            }

            if (winner == "N/A" && filledSpaces === 9)
                winner = "TIE";

            if (winner != "N/A") {
                switch (winner) {
                    case "X":
                    case "O":
                        gameStatus.innerHTML = winner + " is the winner!";
                        break;
                    case "TIE":
                        gameStatus.innerHTML = "Draw";
                        break;
                }
            }
        }
    }
}