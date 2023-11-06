//D. Сортировка слиянием

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
    const [len, str] = input;

    const data = len === '0' ? [] : str.split(' ').map(Number);

    const merge = (startA, endA, startB, endB) => {
        const edges = [startA, endB];
        let sorted = [];
        while (endA - startA > 0 && endB - startB > 0 && startA < endA && startB < endB) {
            let numA = data[startA], numB = data[startB];
            if (numA === numB) {
                sorted.push(numA);
                startA++;
            } else if (numA > numB) {
                sorted.push(numB);
                startB++;

            } else {
                sorted.push(numA);
                startA++;
            }
        }

        while (endA - startA > 0 && startA < endA) {
            let numA = data[startA];
            sorted.push(numA);
            startA++;
        }

        while (endB - startB > 0 && startB < endB) {
            let numB = data[startB];
            sorted.push(numB);
            startB++;
        }
        for (let i = 0, j = edges[0]; i < sorted.length; i++, j++) {
            data[j] = sorted[i]
        }

        return edges;
    }

    const mergesort = (start, end) => {
        if (end - start < 2) {
            if (end - start <= 0) return [start, end]
            data.splice(start, 1, data[start])
            return [start, end]
        }
        let mid = Math.floor((end - start) / 2) + start;

        let left = mergesort(start, mid);
        let right = mergesort(mid, end);

        let [leftStart, leftEnd] = left;
        let [rightStart, rightEnd] = right;

        return merge(leftStart, leftEnd, rightStart, rightEnd);
    }

    mergesort(0, data.length);
    return data.length ? data.join(' ') : '';
}