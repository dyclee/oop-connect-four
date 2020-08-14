import { Column } from "./column.js";
import { ColumnWinInspector } from "./column-win-inspector.js";
import { RowWinInspector } from "./row-win-inspector.js";
import { DiagonalWinInspector } from "./diagonal-win-inspector.js";

export class Game {
    constructor(playerOneName, playerTwoName) {
        this.playerOneName = playerOneName.toUpperCase();
        this.playerTwoName = playerTwoName.toUpperCase();
        this.currentPlayer = 1;
        this.winnerNumber = 0;

        this.columns = [];
        for (let i = 0; i < 7; i++) {
            let columnSlots = [null, null, null, null, null, null]
            this.columns.push(new Column(columnSlots));
        }
    }
    checkForDiagonalWin() {
        const array = this.makeColumnGroupArr();
        for (let i = 0; i < array.length; i++) {
            let checkGroup = new DiagonalWinInspector(array[i]);
            let fourInADiagonal = checkGroup.inspect();
            if (fourInADiagonal > 0) {
                this.winnerNumber = fourInADiagonal;
                return;
            }
        }
    }
    checkForRowWin() {
        const array = this.makeColumnGroupArr();

        for (let i = 0; i < array.length; i++) {
            let check = new RowWinInspector(array[i]);
            let fourInARow = check.inspect();
            if (fourInARow > 0) {
                this.winnerNumber = fourInARow;
                // console.log(this.winnerNumber);
                return;
            }
        }
    }

    checkForColumnWin() {
        for (let objIndex = 0; objIndex < this.columns.length; objIndex++) {
            const columnObj = this.columns[objIndex];
            let check = new ColumnWinInspector(columnObj);
            if (check.inspect() === 1) {
                this.winnerNumber = 1;
                return;
            } else if (check.inspect() === 2) {
                this.winnerNumber = 2;
                return;
            };
            //should return playerNumber;
        }
    }
    checkForTie() {
        for (let i = 0; i < 7; i++) {
            if (this.isColumnFull([i]) === false) {
                return;
            }
        }
        this.winnerNumber = 3;
        // console.log(this.winnerNumber);
    }
    // makes array of column class groups
    makeColumnGroupArr() {
        let checkGroups = [];
        for (let i = 0; i < 4; i++) {
            checkGroups.push(this.columns.slice(i, i + 4));
        }
        return checkGroups;
    }

    isColumnFull(columnIndex) {
        if (this.winnerNumber === 1 || this.winnerNumber === 2) {
            return true;
        }
        return this.columns[columnIndex].isFull();
    }

    playInColumn(columnIndex) {
        this.columns[columnIndex].add(this.currentPlayer);
        this.checkForTie();
        if (this.winnerNumber === 0) {
            this.checkForColumnWin();
            this.checkForRowWin();
            this.checkForDiagonalWin();
        }
        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
        } else {
            this.currentPlayer = 1;
        }
    }

    getTokenAt(rowIndex, columnIndex) {
        const selectedColumn = this.columns[columnIndex];
        let slot = selectedColumn.getTokenAt(rowIndex);
        return slot;
    }
    getName() {
        if (this.winnerNumber === 3) {
            return `${this.playerOneName} ties with ${this.playerTwoName}!`
        } else if (this.winnerNumber === 1) {
            return `${this.playerOneName} wins!`
        } else if (this.winnerNumber === 2) {
            return `${this.playerTwoName} wins!`
        } else {
            return `${this.playerOneName} VS. ${this.playerTwoName}`;
        }
    }


}
