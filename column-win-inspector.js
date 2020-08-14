export class ColumnWinInspector {
    constructor(columnObj) {
        this.columnObj = columnObj;
    }

    inspect() {
        for (let i = 0; i < 3; i++) {
            const tokenOne = this.columnObj.getTokenAt(i);
            const tokenTwo = this.columnObj.getTokenAt(i + 1);
            const tokenThree = this.columnObj.getTokenAt(i + 2);
            const tokenFour = this.columnObj.getTokenAt(i + 3);
            // if four in a row, returns playerNumber of winner
            if (tokenOne === tokenTwo && tokenOne === tokenThree && tokenOne === tokenFour) {
                return tokenOne;
            }
        };
        return 0;
    }
}
