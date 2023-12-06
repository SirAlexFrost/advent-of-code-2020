import input from './day-six-input';

const lines = input.split('\n');

let groupNum = 0;

const groups: Array<string[]> = [];

lines.forEach(line => {
    if (line === '') {
        groupNum++;
        return;
    }

    if (!groups[groupNum]) groups[groupNum] = [];

    const letters = line.match(/(\w)/g)!;

    letters.forEach(letter => {
        const group = groups[groupNum];
        if (!group.includes(letter)) group.push(letter);
    });

});

const part1 = groups.map(group => group.length).reduce((sum, curr) => sum + curr);

console.log('P1 Result:', part1);

// part 2 isnt even hard - brain is just being silly!