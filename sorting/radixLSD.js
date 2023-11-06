//E. Поразрядная сортировка

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
    const [_, ...data] = input;
    const ans = [];
    ans.push(data.join(', '))
    const getMap = () => {
        const map = new Map();
        for (let i = 0; i < 10; i++) {
            map.set(`Bucket ${i}:`, []);
        }
        return map;
    }

    const getSortedArr = (map) => {
        const arr = [];
        for (let [key, val] of map.entries()) {
            if (!val.length) {
                map.set(key, 'empty')
            } else {
                arr.push(...val)
            }
        }
        return arr;
    }

    const transformMap = (map) => {
        const arr = [];
        for (let [key, val] of map.entries()) {
            arr.push(`${key} ${typeof val === 'string' ? val : val.join(', ')}`)
        }
        return arr.join('\n');
    }

    const len = data[0].length;
    let curr = data;
    for (let i = len - 1; i >= 0; i--) {
        const buckets = getMap();

        for (let j = 0; j < curr.length; j++) {
            let str = curr[j];
            buckets.set(`Bucket ${str[i]}:`, [...buckets.get(`Bucket ${str[i]}:`), str]);
        }

        const nextCurr = getSortedArr(buckets);
        ans.push(transformMap(buckets));
        curr = nextCurr;
        if (i === 0) {
            ans.push(curr.join(', '))
        }
    }

    let ansStr = '';
    let phase = 1;
    for (let i = 0; i < ans.length; i++) {
        if (i === 0) {
            ansStr += `Initial array:\n${ans[i]}\n`
        } else if (i !== ans.length - 1) {
            ansStr += `**********\nPhase ${phase}\n${ans[i]}\n`
            phase++;
        } else {
            ansStr += `**********\nSorted array:\n${ans[i]}`
        }
    }

    return ansStr;
}