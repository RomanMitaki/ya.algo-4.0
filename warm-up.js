//Не минимум на отрезке

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const res = solution(input);
    console.log(res);
    process.exit(0);
  });
  
  function solution(input) {
    let [data, arr, ...rest] = input;
    const nums = arr.split(' ').map(Number);
    const windows = rest.map(window => window.split(' ').map(Number));

    const check = (window) => {
        let [start, end] = window;
        let min = nums[start];
        for (let i = start; i <= end; i++) {
            if (nums[i] > min) return nums[i];
            if (nums[i] < min) return min;
        }
        return 'NOT FOUND'
    }

    const ans = windows.map(window => check(window));

    return ans.join('\n')
}

//Сложить две дроби

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
  const data = input.split(" ").map(Number);
  let [a, b, c, d] = data;
  
  let m = a * d + c * b;
  let n = b * d;
  
  const findGcd = (num1, num2) => {
    while (num1 !== 0 && num2 !== 0) {
      if (Math.abs(num1) > Math.abs(num2)) {
        num1 = num1 % num2;
      } else {
        num2 = num2 % num1;
      }
    }
    return !num1 ? num2 : num1;
  };

  const gcd = findGcd(m, n);
  let ans = [m / gcd, n / gcd];
  return ans.join(" ");
}

//Анаграмма?

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const res = solution(input);
    console.log(res);
    process.exit(0);
  });
  
function solution(words) {
  const getHash = (word) => {
    const ans = new Map();
    for (let letter of word) {
      ans.set(letter, (ans.get(letter) || 0) + 1)
    }
    return ans;
  }
  let [first, second] = words;
  const mapFirst = getHash(first);
  const mapSecond = getHash(second);

  if (mapFirst.size !== mapSecond.size) return 'NO';

  for (let key of mapFirst.keys()) {
    if (mapFirst.get(key) !== mapSecond.get(key)) return 'NO';
  }

  return 'YES';
}

//Кролик учит геометрию

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const res = solution(input);
    console.log(res);
    process.exit(0);
  });
  
  function solution(input) {
  const [_, ...rest] = input;
  const matrix = rest.map((el) => el.split(" ").map(Number));

  const n = matrix.length;
  const m = matrix[0].length;

  const seen = [];
  for (let i = 0; i < n; i++) {
    seen.push(new Array(m).fill(0));
  }

  for (let i = 0; i < n; i++) {
    seen[i][0] = matrix[i][0];
  }

  for (let i = 0; i < m; i++) {
    seen[0][i] = matrix[0][i];
  }

  let ans = 0;

  for (i = 1; i < n; i++) {
    for (j = 1; j < m; j++) {
      if (matrix[i][j] === 1) {
        seen[i][j] =
          Math.min(
            seen[i][j - 1],
            Math.min(seen[i - 1][j], seen[i - 1][j - 1])
          ) + 1;
        ans = Math.max(ans, seen[i][j]);
      } else {
        seen[i][j] = 0;
      }
    }
  }

  return ans;
}

//Результаты контеста

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const res = solution(input);
    console.log(res);
    process.exit(0);
  });
  
  function solution(input) {
  const data = input.map(Number);
  let [groupA, groupB, tasks] = data;
  let maxA = groupA;
  let minB = Math.ceil(groupB / tasks);
  if (maxA <= minB) return "No";
  return 'Yes';
}

//Правильная скобочная последовательность

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline.on('line', (line) => {
  const result = solution(line);
  console.log(result);
  process.exit(0);
});

function solution (str) {
    const stack = [];
    const map = new Map();
    map.set('(', ')');
    map.set('[', ']');
    map.set('{', '}');

    for (let i = 0; i < str.length; i++) {
        if (!map.has(str[i])) {
            if (!stack.length || map.get(stack[stack.length - 1]) !== str[i]) {
                return 'no'
            } else {
                stack.pop();
            }
        } else {
            stack.push(str[i]);
        }
    }
    return stack.length ? 'no' : 'yes'
}

//Средний уровень

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const res = solution(input);
    console.log(res);
    process.exit(0);
  });
  
function solution(input) {
    const [_, ...rest] = input;
    const students = rest[0].split(" ").map(Number);

    const prefix = [];
    prefix.push(students[0]);
    for (let i = 1; i < students.length; i++) {
        prefix.push(students[i] + prefix[prefix.length - 1]);
    }
    
    const max = prefix[prefix.length - 1];
    const ans = [];
    for (let i = 0; i < students.length; i++) {
        let len = students.length;
        let curr = students[i];
        let a = 0;
        if (i === 0) {
            a += max - curr * len;
            ans.push(a);
        } else {
            ans.push(max - curr * (len - i) - (prefix[i - 1] - (curr * i - prefix[i - 1])));
        }
    }

    return ans.join(' ');
}

//Лифт

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const res = solution(input);
    console.log(res);
    process.exit(0);
  });
  
function solution(input) {
    let [space, _, ...rest] = input;
    space = +space;
    const passengers = rest.map(Number);

    let ans = BigInt(0);
    let currSpace = space;

    for (let i = passengers.length - 1; i >= 0; i--) {
            let currPassengers = passengers[i];
            if (!currPassengers) continue;

            if (currSpace !== space) {
                currPassengers -= currSpace;
                if (currPassengers < 0) {
                    currSpace = Math.abs(currPassengers);
                    currPassengers = 0;
                } else {
                    currSpace = space;
                }
            }

            while (currPassengers) {
                if (space < currPassengers) {
                    ans += BigInt(Math.floor(currPassengers / space) * (i + 1) * 2);
                    currPassengers -= Math.floor(currPassengers / space) * space;
                } else if (space > currPassengers) {
                    ans += BigInt( (i + 1) * 2);
                    currSpace = space - currPassengers;
                    currPassengers = 0;
                } else {
                    ans += BigInt( (i + 1) * 2);
                    currPassengers = 0;
                }
            }
        }
    
    return String(BigInt(ans))
}

//J. Групповой проект

const readline = require('readline').createInterface(
    process.stdin,
    process.stdout,
);

const input = [];

readline
    .on('line', (line) => {
        input.push(line);
    })
    .on('close', () => {
        const res = solution(input);
        console.log(res);
        process.exit(0);
    });

function solution(input) {
    const [_, ...rest] = input;
    const data = rest.map((el) => el.split(" ").map(Number));
    const check = (arr) => {
        const [n, a, b] = arr;
        let remainder = n % a;
        if (!remainder) return 'YES';
        let gap = b - a;
        let len = Math.floor(n / a);
        if (len * gap < remainder) return 'NO'
        return "YES";
    };

    let ans = data.map(check);
    return ans.join("\n");
}
