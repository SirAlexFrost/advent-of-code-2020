import input from './day-five-input';

const lines = input.split('\n');

type Pass = {
    id: number,
    column: number,
    row: number
}

const passes: Pass[] = [];

lines.forEach(line => {

    let rowRange: number[] = [];
    let columnRange: number[] = [];

    for (let i = 0; i < 128; i++) {
        rowRange.push(i);
    }

    for (let i = 0; i < 8; i++) {
        columnRange.push(i);
    }

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === 'F') {
            rowRange = rowRange.slice(0, rowRange.length / 2);
        }

        if (char === 'B') {
            rowRange = rowRange.slice(rowRange.length / 2);
        }

        if (char === 'L') {
            columnRange = columnRange.slice(0, columnRange.length / 2);
        }

        if (char === 'R') {
            columnRange = columnRange.slice(columnRange.length / 2);
        }
    }

    passes.push({ id: rowRange[0] * 8 + columnRange[0], row: rowRange[0], column: columnRange[0] })
});

const part1 = passes.map(pass => pass.id).reduce((sum, curr) => sum < curr ? curr : sum);
console.log('P1 Result:', part1);

passes.sort((a, b) => a.id - b.id);
const part2 = passes.reduce((pass, curr, index) => {
    const nextPass = passes[index + 1];
    if (!nextPass) return pass;
    if (curr.id + 1 !== nextPass.id) pass = curr.id + 1;

    return pass;
}, 0);

console.log('P2 Result:', part2);
