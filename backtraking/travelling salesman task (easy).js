//Простая задача коммивояжера
/*
const input = [];

const readline = require('readline').createInterface(
    process.stdin,
    process.stdout,
);

readline
    .on('line', (line) => {
        input.push(line);
    })
    .on('close', () => {
        const result = solution(input);
        console.log(result);
        process.exit(0);
    });
*/
function solution(n) {
    let [N, ...rest] = n;
    N = Number(N);
    if (N === 1) return 0;
    let arr = rest.map((str) => str.split(" ").map(Number));
    const matrix = [];
    matrix.push(new Array(N + 1).fill(0));
    for (let i = 0; i < N; i++) {
        matrix.push([0, ...arr[i]]);
    }
    //console.log(matrix);
    let ans = Infinity;
    let seen = new Array(N + 1).fill(false);
    seen[0] = true;
    seen[1] = true;
    const backtracking = (row, currDist, seen) => {
        if (seen.every(Boolean) && matrix[row][1] !== 0) {
            ans = Math.min(ans, currDist + matrix[row][1]);
            return;
        }

        for (let i = 1; i < N + 1; i++) {
            if (!matrix[row][i]) continue;
            if (!seen[i]) {
                seen[i] = true;
                let dist = currDist + matrix[row][i];
                backtracking(i, dist, seen);
                seen[i] = false;
            }
        }
    };
    backtracking(1, 0, seen);
    return ans === Infinity ? -1 : ans;
}