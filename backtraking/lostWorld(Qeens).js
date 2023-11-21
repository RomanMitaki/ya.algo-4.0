//Затерянный мир
/*
const readline = require('readline').createInterface(
    process.stdin,
    process.stdout,
);

readline.on('line', (line) => {
    let result = solution(line);
    console.log(result)
    process.exit(0);
});
*/
function solution(input) {
    if (input === '0') return 0;
    let res = 0;
    const seen = new Set();
    const isValid = function (i, j) {
        const row = `row:${i}`
        const col = `col:${j}`
        const diag1 = `diag1:${i + j}`
        const diag2 = `diag2:${i - j}`

        return !(seen.has(row) || seen.has(col) || seen.has(diag1) || seen.has(diag2))
    }

    const backtrack = (i) => {
        if (i === +input) {
            res++;
            return;
        }
        for (let j = 0; j < +input; j++) {
            if (isValid(i, j)) {
                const row = `row:${i}`
                const col = `col:${j}`
                const diag1 = `diag1:${i + j}`
                const diag2 = `diag2:${i - j}`

                seen.add(row)
                seen.add(col)
                seen.add(diag1)
                seen.add(diag2)

                backtrack(i + 1);

                seen.delete(row)
                seen.delete(col)
                seen.delete(diag1)
                seen.delete(diag2)
            }
        }
    }
    backtrack(0);
    return res;
}