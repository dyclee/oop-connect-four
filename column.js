export class Column {
    constructor(columnArr) {
        this.columnArr = columnArr;
        //first element is the top
    }
    isFull() {
        for (let i = 0; i < 5; i++) {
            if (this.columnArr[i] === null) {
                return false;
            }
        };
        return true;
    }
    add(playerNum) {
        for (let i = 0; i < this.columnArr.length; i++) {
            if (this.columnArr[5 - i] === null) {
                this.columnArr[5 - i] = playerNum;
                return;
            } else {
                //column is full;
            }
        }
    }
    getTokenAt(row) {
        if (this.columnArr[row] === null) {
            return null;
        } else if (this.columnArr[row] === 1) {
            return 1;
        } else {
            return 2;
        }
    }
}
