function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row, column, player) => {
        const targetCell = board[row][column];
        if(targetCell.getValue() === "") {
            targetCell.addToken(player);
            GameDisplay().displayToken(row, column, player)
            console.log("display called from place token");
        } else return;
    };
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
            console.log(boardWithCellValues);
    };

    const clearBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j].addToken("");
            }
        }
    }

    return { rows, columns, getBoard, placeToken, printBoard, clearBoard };
}

function Cell(row) {
    let value = "";

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameDisplay() {
    const board = Gameboard();
    const table = document.getElementById("display");

    const displayBoard = () => {
        for (let i = 0; i < board.rows; i++) {
            let row = table.insertRow();

            for (let j = 0; j < board.columns; j++) {
                row.insertCell();
            }
        }
    }

    const displayToken = (row, column, player) => {
        table.rows[row].cells[column].innerHTML = player;;
    };

    return {
        displayBoard,
        displayToken
    }
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();
    const cell = board.getBoard();
    const players = [
        {
            name: playerOneName,
            token: "X",
            score: 0
        },
        {
            name: playerTwoName,
            token: "O",
            score: 0
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players [1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkWinner = (player) => {
        let isWinner = false;
        console.log(cell[1][1].getValue());
        if (cell[0][0].getValue() === player) {
            if (cell[0][1].getValue() === player && cell[0][2].getValue() === player) {
                console.log("1");
                isWinner = true;
            } else if (cell[1][0].getValue() === player && cell[2][0].getValue() === player) {
                console.log("2");
                isWinner = true;
            }
        } else if (cell[1][1].getValue() === player) {
            if (cell[0][0].getValue() === player && cell[2][2].getValue() === player) {
                console.log("3");
                isWinner = true;
            } else if (cell[0][1].getValue() === player && cell[2][1].getValue() === player) {
                console.log("4");
                isWinner = true
            } else if (cell[0][2].getValue() === player && cell[2][0].getValue() === player) {
                console.log("5");
                isWinner = true;
            } else if (cell[1][0].getValue() === player && cell[1][2].getValue() === player) {
                console.log("6");
                isWinner = true;
            }
        } else if (cell[2][2].getValue() === player) {
            if (cell[0][2].getValue() === player && cell[1][2].getValue() === player) {
                console.log("7");
                isWinner = true;
            } else if (cell[0][0].getValue() === player && cell[2][2].getValue() === player) {
                console.log("8");
                isWinner = true;
            }
        } else {
            isWinner = false;
        }

        console.log(isWinner);

        if(isWinner === true) {
            console.log(`${activePlayer.name} is the winner!`);
            activePlayer.score ++;
            for (let i = 0; i < players.length; i++) {
                console.log(players[i].name + ": " + players[i].score);
            }
            board.clearBoard();

        }
    };  

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} takes cell ${row} by ${column}.`);
        board.placeToken(row, column, activePlayer.token);

        checkWinner(activePlayer.token);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();
const display = GameDisplay().displayBoard();


function testRound() {
    const row = document.getElementById("row").value;
    const column = document.getElementById("column").value;
    game.playRound(row, column);
}