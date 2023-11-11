//Подпадиндромы

const readline = require('readline').createInterface(
    process.stdin,
    process.stdout,
);

readline.on('line', (line) => {
    const result = solution(line);
    console.log(result);
    process.exit(0);
});

function solution(input) {
    if (!input) return 0;
    if (input.length === 1) return 1;

    const n = input.length;
    const p = BigInt(10 ** 9 + 7);
    const x_ = BigInt(257);
    const hashes = [BigInt(0)];
    const reversedHashes = [BigInt(0)];
    const xPowers = [BigInt(1)];

    let s = ' ' + input;

    for (let i = 1, right = s.length - 1; i < n + 1; i++, right--) {
        let letter = s[i];
        let rLetter = s[right];
        reversedHashes[i] = BigInt(reversedHashes[i - 1] * x_ + BigInt(rLetter.codePointAt(0))) % p;
        hashes[i] = BigInt(hashes[i - 1] * x_ + BigInt(letter.codePointAt(0))) % p;
        xPowers[i] = BigInt(xPowers[i - 1] * x_) % p;
    }

    const isEqual = (from1, from2, len) => {
        return (
            (hashes[from1 + len - 1] + reversedHashes[from2 - 1] * xPowers[len]) % p ===
            (reversedHashes[from2 + len - 1] + hashes[from1 - 1] * xPowers[len]) % p
        );
    };

    const oddsP = new Array(n + 1);
    oddsP[0] = 0;
    const evenP = new Array(n + 1);
    evenP[0] = 0;

    for (let i = 1; i < n + 1; i++) {
        let left = 1, right = Math.min(i, n + 1 - i);
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (isEqual(i - mid + 1, n + 1 - i - mid + 1, mid)) {
                oddsP[i] = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    for (let i = 1; i < n + 1; i++) {

        let left = 1, right = Math.min(i - 1, n + 1 - i);
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (isEqual(i - mid, n + 1 - i - mid + 1, mid)) {
                evenP[i] = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        if (!evenP[i]) evenP[i] = 0;
    }

    return oddsP.reduce((a, b) => a + b, 0) + evenP.reduce((a, b) => a + b, 0);
}