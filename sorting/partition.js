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
    let [_, str, pivot] = input;
    const data = str === '' ? [] : str.split(' ').map(Number);

    const swap = (arr, a, b) => {
        return [arr[a], arr[b]] = [arr[b], arr[a]]
    }
    const getPartitionIndex = (pivot, arr) => {
        let greater, equal;
        if (!arr.length) return -1;
        for (let i = 0; i < arr.length; i++) {
            let curr = arr[i];
            if (curr < pivot) {
                if (equal === undefined && greater === undefined) {
                    continue
                } else {
                    if (equal === undefined) {
                        swap(arr, greater, i);
                        greater++;
                    } else if (greater === undefined) {
                        swap(arr, equal, i);
                        equal++;
                    } else {
                        swap(arr, greater, i);
                        swap(arr, equal, greater);
                        greater++;
                        equal++;
                    }
                }
            } else if (curr > pivot) {
                if (greater === undefined) {
                    greater = i;
                }
            } else {
                if (equal === undefined && greater === undefined) {
                    equal = i;
                } else if (equal === undefined) {
                    swap(arr, greater, i);
                    equal = greater;
                    greater++;
                } else {
                    swap(arr, greater, i);
                    greater++;
                }
            }
        }
        return equal !== undefined ? equal : greater !== undefined ? greater : arr.length;
    }

    let ans = getPartitionIndex(pivot, data);
    return ans === -1 ? [0, 0].join('\n') : ans === data.length ? [data.length, 0].join('\n') : [ans, data.length - ans].join('\n')
}