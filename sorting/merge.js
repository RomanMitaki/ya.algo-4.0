//C. Слияние

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

function solution(input) {
    const [lenA, strA, lenB, strB] = input;

    const arrA = lenA === '0' ? [] : strA.split(' ').map(Number);
    const arrB = lenB === '0' ? [] : strB.split(' ').map(Number);
    const ans = [];
    const merge = (startA, endA, startB, endB, currIdx) => {

        while (arrA.length && arrB.length && startA < endA && startB < endB) {
            let numA = arrA[startA], numB = arrB[startB];
            if (numA === numB) {
                ans.splice(currIdx, 0, numA);
                currIdx++;
                startA++;
            } else if (numA > numB) {
                ans.splice(currIdx, 0, numB);
                startB++;
                currIdx++;
            } else {
                ans.splice(currIdx, 0, numA);
                startA++;
                currIdx++;
            }
        }

        while (arrA.length && startA < endA) {
            let numA = arrA[startA];
            ans.splice(currIdx, 0, numA);
            startA++;
            currIdx++;
        }

        while (arrB.length && startB < endB) {
            let numB = arrB[startB];
            ans.splice(currIdx, 0, numB);
            startB++;
            currIdx++;
        }
    }
    merge(0, arrA.length, 0, arrB.length, 0);
    return ans.length ? ans.join(' ') : '';
}