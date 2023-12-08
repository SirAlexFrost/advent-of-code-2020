import { test, input } from './day-7-input';

const lines = input.split('\n');

const parentBagRegex = /((\w+ \w+) (bag|bags) )/
const childBagRegex = /((\d+) (\w+ \w+))/g

const bagMap: { [index: string]: { [index: string]: number } } = {}

lines.forEach(line => {
    const bags: Array<Array<string | number>> = []

    const parentBag = line.match(parentBagRegex)![2];
    const otherBags = line.matchAll(childBagRegex);

    let done = false;
    while (!done) {
        const bag = otherBags.next();

        if (bag.done) {
            done = true;
            break;
        }

        bags.push([bag.value[3], Number(bag.value[2])]);
    }

    bagMap[parentBag] = {};
    const bag = bagMap[parentBag];

    for (const child of bags) {
        bag[child[0] as string] = child[1] as number;
    }
});

const bags = Object.keys(bagMap);

const searchBag = (bag: { [index: string]: number }, target: string) => {
    const otherBags = Object.keys(bag);

    if (otherBags.length === 0) return false;
    if (otherBags.includes(target)) return true;

    for (const otherBag of otherBags) {
        const containsShiny = searchBag(bagMap[otherBag], target);
        if (containsShiny) return true;
    }

    return false;
}

const bagsInside = (bag: { [index: string]: number }) => {

    const otherBags = Object.keys(bag);

    let bagSum = otherBags.map(otherBag => bag[otherBag]).reduce((sum, curr) => sum += curr, 0);

    for (const otherBag of otherBags) {
        bagSum += (bagsInside(bagMap[otherBag]) * bag[otherBag]);
    }

    return bagSum;
}

const part1 = bags.map(bagString => {
    const bag = bagMap[bagString];
    return (searchBag(bag, 'shiny gold') ? 1 : 0) as number;
}).reduce((sum, curr) => sum += curr, 0);

console.log('P1 Result:', part1);

const part2 = console.log('P2 Result:', bagsInside(bagMap['shiny gold']));