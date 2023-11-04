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
    if (input == 0) return '';

    let [len, str] = input;

    if (len == 0) return '';

    const data = str === '' ? [] : str.split(' ').map(Number);

    if (!data.length) return '';

    function getPivot(arr, start, end) {
        let min = start;
        let max = end;
        let idx = Math.floor(Math.random() * (max - min) + min)
        return arr[idx];
    }

    const swap = (arr, a, b) => {
        return [arr[a], arr[b]] = [arr[b], arr[a]]
    }
    const getPartitionIndex = (pivot, arr, start, end) => {
        let greater, equal;
        if (!arr.length) return -1;
        for (let i = start; i < end; i++) {
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
                } else if (greater === undefined) {
                    continue
                } else {
                    swap(arr, greater, i);
                    greater++;
                }
            }
        }
        return equal !== undefined ? equal : greater !== undefined ? greater : arr.length;
    }
    const quicksort = (arr, start, end) => {
        if (end - start < 2) {
            return;
        }
        let pivot = getPivot(arr, start, end);

        const partition = getPartitionIndex(pivot, arr, start, end);

        if (partition === start) {
            let p = start;
            while (arr[p + 1] !== undefined && arr[start] === arr[p + 1]) {
                p++;
            }
            if (arr[p + 1] !== undefined) {
                quicksort(arr, p + 1, end);
            } else {
                return
            }
        } else {
            quicksort(arr, start, partition)
            quicksort(arr, partition, end)
        }


    }

    quicksort(data, 0, data.length);
    return data.join(' ');
}