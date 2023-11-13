//Быстрый алгоритм Дейкстра

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
    let [initial, ...rest] = input;
    let [N, K]= initial.split(' ').map(Number);

    let arr = rest.map(str => str.split(' ').map(Number)).slice(0, -1);
    let [A, B] = rest[rest.length - 1].split(' ').map(Number);

    let graph = new Map();

    for (let [city1, city2, dist] of arr) {
        if (!graph.has(city1)) {
            graph.set(city1, []);
        }
        graph.get(city1).push([city2, dist]);
        if (!graph.has(city2)) {
            graph.set(city2, []);
        }
        graph.get(city2).push([city1, dist]);
    }
    //console.log(graph)

    if (!graph.has(A) || !graph.has(B)) return -1;

    const distances = new Array(N + 1).fill(Infinity);
    distances[A] = 0;

    const top = 0;
    const parent = i => ((i + 1) >>> 1) - 1;
    const left = i => (i << 1) + 1;
    const right = i => (i + 1) << 1;

    class PriorityQueue {
        constructor(comparator = (a, b) => a > b) {
            this._heap = [];
            this._comparator = comparator;
        }

        size() {
            return this._heap.length;
        }

        isEmpty() {
            return this.size() == 0;
        }

        peek() {
            return this._heap[top];
        }

        push(...values) {
            values.forEach(value => {
                this._heap.push(value);
                this._siftUp();
            });
            return this.size();
        }

        pop() {
            const poppedValue = this.peek();
            const bottom = this.size() - 1;
            if (bottom > top) {
                this._swap(top, bottom);
            }
            this._heap.pop();
            this._siftDown();
            return poppedValue;
        }

        replace(value) {
            const replacedValue = this.peek();
            this._heap[top] = value;
            this._siftDown();
            return replacedValue;
        }

        _greater(i, j) {
            return this._comparator(this._heap[i], this._heap[j]);
        }

        _swap(i, j) {
            [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
        }

        _siftUp() {
            let node = this.size() - 1;
            while (node > top && this._greater(node, parent(node))) {
                this._swap(node, parent(node));
                node = parent(node);
            }
        }

        _siftDown() {
            let node = top;
            while (
                (left(node) < this.size() && this._greater(left(node), node)) ||
                (right(node) < this.size() && this._greater(right(node), node))
                ) {
                let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
                this._swap(node, maxChild);
                node = maxChild;
            }
        }
    }

    //console.log(distances)

    let heap = new PriorityQueue((a, b) => a[0] < b[0]);
    heap.push([0, A]);

    while (!heap.isEmpty()) {
        let node = heap.pop();
        let [currDist, city] = node;

        if (currDist > distances[city]) {
            continue;
        }

        for (let neighbor of graph.get(city)) {
            let [nextCity, d] = neighbor;
            let dist = currDist + d;

            if (dist < distances[nextCity]) {
                distances[nextCity] = dist;
                heap.push([dist, nextCity])
            }
        }
    }
    if (distances[B] === Infinity) return -1;
    return distances[B];

}