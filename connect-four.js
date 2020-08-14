import { Game } from "./game.js";

window.addEventListener("DOMContentLoaded", e => {
    let game = undefined;

    const inputPlayerOneName = document.getElementById("player-1-name");
    const inputPlayerTwoName = document.getElementById("player-2-name");
    const playerNamesForm = document.getElementById("form-holder");
    const newGameButton = document.getElementById("new-game");
    const clicksTarget = document.getElementById("click-targets");

    // const playerOne = {
    //     name: ""
    // }
    // const playerTwo = {
    //     name: ""
    // }

    // updates the board and game name
    function updateUI() {
        const boardHolder = document.getElementById("board-holder");
        if (game === undefined) {
            boardHolder.setAttribute("class", "is-invisible")
        } else {
            boardHolder.classList.remove("is-invisible");
            const gameName = document.getElementById("game-name");
            gameName.innerHTML = game.getName();
            changePlayerColor();
            // checks every board slot for token;
            for (let row = 0; row < 6; row++) {
                for (let column = 0; column < 7; column++) {
                    let slot = document.getElementById(`square-${row}-${column}`);
                    slot.innerHTML = "";
                    let tokenPlacement = document.createElement("div");
                    if (game.getTokenAt(row, column) === 1) {
                        tokenPlacement.setAttribute("class", "token black");
                        slot.appendChild(tokenPlacement);
                    } else if (game.getTokenAt(row, column) === 2) {
                        tokenPlacement.setAttribute("class", "token red");
                        slot.appendChild(tokenPlacement);

                    }
                }
            };

            // checks if columns are full
            for (let i = 0; i < 7; i++) {
                const selectedColumn = document.getElementById(`column-${i}`);
                if (game.isColumnFull(i)) {
                    selectedColumn.classList.add("full");
                } else {
                    selectedColumn.classList.remove("full");
                }
            }
        }
    }
    function changePlayerColor() {
        if (game.currentPlayer === 1) {
            clicksTarget.classList.add("black");
            clicksTarget.classList.remove("red");

        } else {
            clicksTarget.classList.add("red");
            clicksTarget.classList.remove("black");
        }
    }
    // when a player clicks an option and makes a play
    clicksTarget.addEventListener("click", e => {
        let columnIndex = Number(e.target.id.slice(-1));
        game.playInColumn(columnIndex);
        updateUI();
        if (game.winnerNumber !== 0) {
            clicksTarget.style.pointerEvents = 'none';
        }
    })

    //must enter values for both names to enable new game button
    playerNamesForm.addEventListener("keyup", event => {

        if (inputPlayerOneName.value.length > 0 && inputPlayerTwoName.value.length > 0) {
            enableNewGameButton();
        } else {
            disableNewGameButton();
        }
    });
    // starts new game
    newGameButton.addEventListener("click", e => {
        clicksTarget.style.pointerEvents = 'auto';
        game = new Game(inputPlayerOneName.value, inputPlayerTwoName.value);
        resetNames();
        disableNewGameButton();
        updateUI();
    });

    //disables new game button
    function disableNewGameButton() {
        const newGameButton = document.getElementById("new-game");
        newGameButton.disabled = true;
    }
    //enables new game button
    function enableNewGameButton() {
        const newGameButton = document.getElementById("new-game");
        newGameButton.disabled = false;
    }


    // resets player names after new game is started
    function resetNames() {
        inputPlayerOneName.value = "";
        inputPlayerTwoName.value = "";
    }

})
