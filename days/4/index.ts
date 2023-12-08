import input from './day-four-input';

const lines = input.split('\n');

const passports: Array<Record<string, string>> = [];

const passportRegex = /((\w+):([#\d\w]+))/g

let pnum = 0;
lines.forEach(line => {
    if (line === '') {
        pnum++;
        return;
    }

    if (!passports[pnum]) passports.push({});
    const passport = passports[pnum];

    const matches = line.matchAll(passportRegex)!;

    let done = false;
    while (!done) {
        const match = matches.next();

        if (match.done) {
            done = true;
            return;
        }

        const category = match.value[2];
        const value = match.value[3];

        passport[category] = value;

    }

});

const required = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];

const part1 = passports.reduce((sum, curr) => {

    const categorys = Object.keys(curr);

    let valid = true;

    for (const category of required) {
        if (valid) valid = categorys.includes(category);
        if (!valid) break;
    }

    if (valid) sum++;

    return sum;
}, 0);

console.log('P1 Result:', part1);

const heightRegex = /^((\d+)(cm|in))$/
const hexRegex = /^(#[0-9a-f]{6})$/
const eyeRegex = /^(amb|blu|brn|gry|grn|hzl|oth)$/
const pidRegex = /^(\d{9})$/

const heightRanges: { [type: string]: number[] } = {
    'cm': [150, 193],
    'in': [59, 76]
}

const part2 = passports.reduce((sum, curr) => {

    const categorys = Object.keys(curr);

    let valid = true;

    // Ensure all required categories are present.
    for (const category of required) {
        if (valid) valid = categorys.includes(category);
        if (!valid) break;
    }

    // If not valid based on missing categories, goodbye!
    if (!valid) return sum;

    // Enforce category rules!

    // Birthyear
    const byr = Number(curr['byr']);
    if (byr < 1920 || byr > 2002) return sum;

    // Issue year
    const iyr = Number(curr['iyr']);
    if (iyr < 2010 || iyr > 2020) return sum;

    // Expiry year
    const eyr = Number(curr['eyr']);
    if (eyr < 2020 || eyr > 2030) return sum;

    // Height
    const hgt = curr['hgt'];
    if (!heightRegex.test(hgt)) return sum;

    const match = hgt.match(heightRegex)!;
    const height = Number(match[2]);
    const type = match[3];

    const min = heightRanges[type][0];
    const max = heightRanges[type][1];

    if (height < min || height > max) return sum;

    // Hair colour
    const hcl = curr['hcl'];
    if (!hexRegex.test(hcl)) return sum;

    const ecl = curr['ecl'];
    if (!eyeRegex.test(ecl)) return sum;

    const pid = curr['pid'];
    if (!pidRegex.test(pid)) return sum;

    return sum += 1;
}, 0);

console.log('P2 Result:', part2);