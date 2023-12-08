import input from './day-three-input';

const lines = input.split('\n');

const getTrees = (across: number, down: number) => {
    let i = 0;
    let j = 0;

    let trees = 0;

    let bottom = false;
    while (!bottom) {

        i += down; // Line number

        if (i >= lines.length) {
            bottom = true;
            break;
        }

        j += across;

        if (j > 30) {
            j -= 31;
        };

        if (lines[i][j] === '#') trees++;
    }
    return trees;
}

console.log('P1 Result:', getTrees(3, 1));

const slope1 = getTrees(1, 1);
const slope2 = getTrees(3, 1);
const slope3 = getTrees(5, 1);
const slope4 = getTrees(7, 1);
const slope5 = getTrees(1, 2);

console.log('P2 Result:', slope1 * slope2 * slope3 * slope4 * slope5);




