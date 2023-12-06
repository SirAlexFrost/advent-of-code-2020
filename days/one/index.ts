import input from './day-one-input';

const numbers = input.split('\n').map(line => Number(line));

let before = performance.now();
const part1 = numbers.reduce((sum, curr) => {
    const other = 2020 - curr;
    if (numbers.includes(other)) {
        sum = [curr, other];
    }

    return sum;
}, [0, 0]).reduce((sum, curr) => sum *= curr, 1);
let after = performance.now();
let time = (after - before).toFixed(2) + 'ms';

console.log('P1 Result:', part1);
console.log('P1 Time:', time);

before = performance.now();

const part2 = numbers.reduce((sum, curr) => {
    const other = 2020 - curr;
    const possible = numbers.filter(num => (num < other && num + curr < 2020));

    let answer: number[] = [];

    possible.forEach(number => {
        const otherPossible = possible.filter(num => (num + number + curr) === 2020);
        if (otherPossible.length > 0) {
            answer = [otherPossible[0], number, curr];
            sum = answer;
            return;
        }
    });

    return sum;
}, [0, 0, 0]).reduce((sum, curr) => sum *= curr, 1);

after = performance.now();
time = (after - before).toFixed(2) + 'ms';

console.log('P2 Result:', part2);
console.log('P2 Time:', time);