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
    let [s, _, ...rest] = input;
    const data = rest.map((str) => str.split(" ").map(Number));

    const n = s.length;
    const p = BigInt(10 ** 9 + 7);
    const x_ = BigInt(257);
    const hashes = [BigInt(0)];
    const xPowers = [BigInt(0)];
    xPowers[0] = BigInt(1);

    s = " " + s;

    for (let i = 1; i < n + 1; i++) {
        let letter = s[i];
        hashes[i] = BigInt(hashes[i - 1] * x_ + BigInt(letter.codePointAt(0))) % p;
        xPowers[i] = BigInt(xPowers[i - 1] * x_) % p;
    }

    const isEqual = (from1, from2, len) => {
        return (
            (hashes[from1 + len - 1] + hashes[from2 - 1] * xPowers[len]) % p ===
            (hashes[from2 + len - 1] + hashes[from1 - 1] * xPowers[len]) % p ? 'yes' : 'no'
        );
    };

    const ans = data.map(([l, a, b]) => {
        return isEqual(a+1, b+1, l);
    })

    return ans.join('\n')
}