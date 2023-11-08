//z-функция O(N logN)
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
    let s = input;

    const n = s.length;
    const p = BigInt(10 ** 9 + 7);
    const x_ = BigInt(257);
    const hashes = [BigInt(0)];
    const xPowers = [];
    xPowers[0] = BigInt(1);
    const ans = [0];
    s = " " + s;

    for (let i = 1; i < n + 1; i++) {
        let letter = s[i];
        hashes[i] = BigInt(hashes[i - 1] * x_ + BigInt(letter.codePointAt(0) - 96)) % p;
        xPowers[i] = BigInt(xPowers[i - 1] * x_) % p;
    }
    //console.log(hashes);
    const isEqual = (from1, from2, len) => {
        return (
            (hashes[from1 + len - 1] + hashes[from2 - 1] * xPowers[len]) % p ===
            (hashes[from2 + len - 1] + hashes[from1 - 1] * xPowers[len]) % p
        );
    };

    const binarySearch = (iterator) => {
        let left = 1;
        let right = s.length - iterator;
        //console.log(right)
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (!isEqual(1, iterator, mid)) {
                right = mid - 1;

            } else {
                left = mid + 1;
            }
        }

        return left;
    };

    for (let i = 2; i < s.length; i++) {
        if (!isEqual(1, i, 1)) {
            ans.push(0);
        } else {
            ans.push(binarySearch(i) - 1)
        }
    }
    return ans.join(' ')
}

//z-функция O(N) решение из Googl'a )

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
    let ans = [0];

    function getZarr(str, Z) {
        let n = str.length;

        let L = 0;
        let R = 0;

        for (let i = 1; i < n; i++) {
            if (i > R) {
                L = R = i;

                while (R < n && str[R - L] == str[R]) R++;

                Z[i] = R - L;
                R--;
            } else {
                let k = i - L;

                if (Z[k] < R - i + 1) Z[i] = Z[k];
                //
                else {
                    L = i;
                    while (R < n && str[R - L] == str[R]) R++;

                    Z[i] = R - L;
                    R--;
                }
            }
        }
    }

    getZarr(input, ans);
    return ans.join(" ").trim();
}