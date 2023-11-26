//Объединение последовательностей
/*
const readline = require('readline').createInterface(
    process.stdin,
    process.stdout,
);

readline.on('line', (line) => {
    let res = solution(line);
    console.log(res);
    process.exit(0);
});
*/
function solution(input) {
    let N = Number(input);
    let ans = 0;
    let pointer1 = 1;
    let pointer2 = 1;
    let pointer3 = 1;
    while (pointer3 <= N) {
        let first = pointer1 ** 2;
        let second = pointer2 ** 3;
        if (first < second) {
            ans = first;
            pointer1++;
        } else if (first > second) {
            ans = second;
            pointer2++;
        } else {
            ans = first;
            pointer1++;
            pointer2++;
        }
        pointer3++
    }
    return ans;
}