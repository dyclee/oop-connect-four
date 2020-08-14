export class RowWinInspector {
    constructor(columnObjs) {
        this.columnObjs = columnObjs;
    }

    inspect() {
        for (let i = 0; i < 6; i++) {
            const arr = [];
            this.columnObjs.forEach(function (obj) {
                arr.push(obj.getTokenAt(i));
            });

            if (arr[0] !== null && arr[0] === arr[1] && arr[0] === arr[2] && arr[0] === arr[3]) {
                return arr[0];
            }
        };
        return 0;
    }
}
