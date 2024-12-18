let tableCount = 0;

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
        } else return;
    };
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
            console.log(boardWithCellValues);
    };

    const displayBoard = () => {
        tableCount++;
        console.log("tableCount: " + tableCount);
        let table = document.createElement("TABLE");
        table.setAttribute("id", `table${tableCount}`);
        document.body.appendChild(table);
    
        for (let i = 0; i < rows; i++) {
            let row = table.insertRow();

            for (let j = 0; j < columns; j++) {
                let cell = row.insertCell();
                cell.innerHTML = `<button onclick="game.playRound(${i}, ${j})"></button>`
            }
        }
    }

    const clearBoard = () => {
        const table = document.getElementById(`table${tableCount}`);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const cell = table.rows[i].cells[j];
                if (cell.innerHTML != "X" && cell.innerHTML != "O") {
                    cell.innerHTML = "";
                }
            }
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j].addToken("");
            }
        }
    }

    return { rows, columns, getBoard, placeToken, printBoard, displayBoard, clearBoard };
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
    const displayToken = (row, column, player) => {
        console.log("tableCount: " + tableCount);
        const table = document.getElementById(`table${tableCount}`);
        table.rows[row].cells[column].innerHTML = player;
    };

    return {
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
        if (cell[0][0].getValue() === player) {
            if (cell[0][1].getValue() === player && cell[0][2].getValue() === player) {
                console.log("Combo: 1");
                isWinner = true;
            } else if (cell[1][0].getValue() === player && cell[2][0].getValue() === player) {
                console.log("Combo: 2");
                isWinner = true;
            }
        }
        if (cell[1][1].getValue() === player) {
            if (cell[0][0].getValue() === player && cell[2][2].getValue() === player) {
                console.log("Combo: 3");
                isWinner = true;
            } else if (cell[0][1].getValue() === player && cell[2][1].getValue() === player) {
                console.log("Combo: 4");
                isWinner = true;
            } else if (cell[0][2].getValue() === player && cell[2][0].getValue() === player) {
                console.log("Combo: 5");
                isWinner = true;
            } else if (cell[1][0].getValue() === player && cell[1][2].getValue() === player) {
                console.log("Combo: 6");
                isWinner = true;
            }
        }
        if (cell[2][2].getValue() === player) {
            if (cell[0][2].getValue() === player && cell[1][2].getValue() === player) {
                console.log("Combo: 7");
                isWinner = true;
            } else if (cell[2][0].getValue() === player && cell[2][1].getValue() === player) {
                console.log("Combo: 8");
                isWinner = true;
            } 
        }

        console.log("isWinner = " + isWinner);

        if(isWinner === true) {
            console.log(`${activePlayer.name} is the winner!`);
            activePlayer.score ++;
            for (let i = 0; i < players.length; i++) {
                console.log(players[i].name + ": " + players[i].score);
            }
            board.clearBoard();
            board.displayBoard();

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
    board.displayBoard();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();


// function testRound() {
//     const row = document.getElementById("row").value;
//     const column = document.getElementById("column").value;
//     game.playRound(row, column);
// }