//Все перестановки заданной длины
/*
const readline = require('readline').createInterface(
    process.stdin,
    process.stdout,
);

readline.on('line', (line) => {

    solution(line);
    process.exit(0);
});
*/
function solution(input) {
    let ans = [];
    let nums = [];
    for (let i = 1; i <= Number(input); i++) {
        nums.push(i);
    }
    const backtrack = (curr) => {
        if (curr.length === Number(input)) {
            ans.push([...curr]);
            if (ans.length === 10000) {
                console.log(ans.map(el => el.join('')).join('\n'));
                ans.length = 0;
            }
            return
        }

        for (let num of nums) {
            if (!curr.includes(num)) {
                curr.push(num);
                backtrack(curr);
                curr.pop();
            }
        }
    }

    backtrack([]);
    if (ans.length) console.log(ans.map(el => el.join('')).join('\n'))

}