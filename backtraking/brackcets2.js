//Генерация правильных скобочных последовательностей - 2
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
function solution(n) {
    n = Number(n);
    let ans = [];
    //parentheses
    //square brackets
    const isValid = (arr) => {
        let stack = [];
        for (let i = 0; i < arr.length; i++) {
            let b = arr[i];
            if (b === "(") {
                stack.push(")");
            }
            if (b === "[") {
                stack.push("]");
            }
            if (b === ")" || b === "]") {
                if (!stack.length || stack.pop() !== b) {
                    return false;
                }
            }
        }
        return stack.length === 0;
    };

    const backtracking = (curr, leftP, rightP, leftS, rightS) => {
        if (curr.length === n) {
            if (isValid(curr)) {
                ans.push(curr.join(""));
            }
            if (ans.length === 10000) {
                console.log(ans.join('\n'));
                ans.length = 0;
            }
            return;
        }
        if (leftP + leftS < n / 2) {
            curr.push("(");
            backtracking(curr, leftP + 1, rightP, leftS, rightS);
            curr.pop();
        }
        if (leftS + leftP < n / 2) {
            curr.push("[");
            backtracking(curr, leftP, rightP, leftS + 1, rightS);
            curr.pop();
        }
        if (rightS < leftS) {
            curr.push("]");
            backtracking(curr, leftP, rightP, leftS, rightS + 1);
            curr.pop();
        }
        if (rightP < leftP) {
            curr.push(")");
            backtracking(curr, leftP, rightP + 1, leftS, rightS);
            curr.pop();
        }
    };
    backtracking([], 0, 0, 0, 0);
    if (ans.length) console.log(ans.join("\n"));
}