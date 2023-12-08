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

type Group = {
    people: number,
    questions: {
        [index: string]: number
    },
    count: number
}

let people = 0;
let groupIndex = 0;

const groups2: Array<Group> = [];

lines.forEach((line, index) => {
    if (line === '') {
        people = 0;
        groupIndex++;
        return;
    }

    if (!groups2[groupIndex]) groups2[groupIndex] = { people: 0, questions: {}, count: 0 }
    const group = groups2[groupIndex];

    const questions = line.split('');
    for (const question of questions) {
        if (!group.questions[question]) group.questions[question] = 0;
        group.questions[question] += 1;
    }

    group.people++;
});

const part2 = groups2.map(group => {
    const questions = Object.keys(group.questions);

    for (const question of questions) {
        const q = group.questions[question];
        if (q === group.people) group.count++;
    }

    return group.count;
}).reduce((sum, curr) => sum += curr, 0);

console.log('P2 Result:', part2);