import input from './day-two-input';

const lines = input.split('\n');

const policyRegex = /(\d+)-(\d+) (\w): (\w+)/;

const part1 = lines.reduce((sum, curr) => {
    const policy = curr.match(policyRegex)!;

    const min = Number(policy[1]);
    const max = Number(policy[2]);
    const char = policy[3];
    const pass = policy[4];

    const passRegex = new RegExp(`(${char})`, 'g');
    const chars = pass.match(passRegex);

    if (!chars) return sum;

    const count = chars.length;

    if (count >= min && count <= max) return sum += 1;

    return sum;
}, 0);

console.log('P1 Result:', part1);

const part2 = lines.reduce((sum, curr) => {
    const policy = curr.match(policyRegex)!;

    const min = Number(policy[1]) - 1;
    const max = Number(policy[2]) - 1;
    const char = policy[3];
    const pass = policy[4];

    let valid = false;

    if (pass[min] === char) valid = !valid;
    if (pass[max] === char) valid = !valid;

    if (valid) return sum += 1;

    return sum;
}, 0);

console.log('P2 Result:', part2);