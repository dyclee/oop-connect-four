export class DiagonalWinInspector {
    constructor(columns) {
        //array of column classes
        this.columns = columns;
    }

    inspect() {
        const columnOne = this.columns[0];
        const columnTwo = this.columns[1];
        const columnThree = this.columns[2];
        const columnFour = this.columns[3];

        for (let i = 5; i > 2; i--) {
            if (columnOne.columnArr[i] === columnTwo.columnArr[i - 1] &&
                columnOne.columnArr[i] === columnThree.columnArr[i - 2] &&
                columnOne.columnArr[i] === columnFour.columnArr[i - 3] &&
                columnOne.columnArr[i] !== null) {
                return columnOne.columnArr[i]; //shound be a winner number;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (columnOne.columnArr[i] === columnTwo.columnArr[i + 1] &&
                columnOne.columnArr[i] === columnThree.columnArr[i + 2] &&
                columnOne.columnArr[i] === columnFour.columnArr[i + 3] &&
                columnOne.columnArr[i] !== null) {
                return columnOne.columnArr[i];
            }
        }
    }

}
