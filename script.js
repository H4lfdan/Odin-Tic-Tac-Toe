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
        if(targetCell.getValue() === 0) {
            targetCell.addToken(player);
        } else return;
    };
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
            console.log(boardWithCellValues);
    };

    return { getBoard, placeToken, printBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
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
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
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
        if (cell[0][0].value === player) {
            if (cell[0][1].value === player && cell[0,2]) {
                isWinner = true;
            } else if (cell[1][0].value === player && cell[2,0]) {
                isWinner = true;
            }
        } else if (cell[1][1].value === player) {
            if (cell[0][0].value === player && cell[2][2].value === player) {
                isWinner = true;
            } else if (cell[0][1].value === player && cell[2][1].value === player) {
                isWinner = true
            } else if (cell[0][2].value === player && cell[2][0].value === player) {
                isWinner = true;
            } else if (cell[1][0].value === player && cell[1][2].value === player) {
                isWinner = true;
            }
        } else if (cell[2][2].value === player) {
            if (cell[0][2].value === player && cell[1][2].value === player) {
                isWinner = true;
            } else if (cell[0][0].value === player && cell[2][2].value === player) {
                isWinner = true;
            }
        } 

        if(isWinner = true) {
            console.log(`${getActivePlayer().name} is the winner!`);
        }
    };  

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} takes cell ${row} by ${column}.`);
        board.placeToken(row, column, getActivePlayer().token);

        checkWinner(getActivePlayer().token);

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

function testRound() {
    const row = document.getElementById("row").value;
    const column = document.getElementById("column").value;
    game.playRound(row, column);
}