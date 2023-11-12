//Дейкстра
//https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript (heap)

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
    let [N, S, F] = initial.split(' ').map(Number);
    //console.log(N, S, F);
    let arr = rest.map(str => str.split(' ').map(Number));
    const matrix = [];
    matrix.push(new Array(N + 1).fill(0));
    for (let i = 0; i < N; i++) {
        matrix.push([0, ...arr[i]])
    }
    //console.log(matrix)
    const distances = new Array((N + 1)).fill(Infinity);
    distances[S] = 0;

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
    heap.push([0, S]);

    while (!heap.isEmpty()) {
        let node = heap.pop();
        let [currDist, V] = node;

        if (currDist > distances[V]) {
            continue;
        }

        for (let i = 1; i < N + 1; i++) {
            if (!matrix[V][i] || matrix[V][i] === -1) continue;

            let dist = currDist + matrix[V][i];

            if (dist < distances[i]) {
                distances[i] = dist;
                heap.push([dist, i])
            }
        }
    }
    return distances[F] === Infinity ? -1 : distances[F];;
}