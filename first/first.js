import * as fs from 'fs';
import * as readline from 'node:readline/promises';

const filename = 'input.txt';
const inputStream = fs.createReadStream(filename);
const letters = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five" : 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
};
let sum = 0;

var lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
});

lineReader.on("line", function (line) {
    // first replace all written numbers with digits, minding the order
    let string = '';
    let found = false;
    for (let j = 0; j < line.length; j++) {
        if (found) {
            found = false;
            break;
        }
        const char = line[j];
        string += char;
        for (let i = 0; i < Object.keys(letters).length; i++) {
            const key = Object.keys(letters)[i];
            let indexOf = string.indexOf(key);
            if (indexOf >= 0) {
                line = line.replace(key, letters[key]);
                found = true;
                break;
            }
        };
    }

    string = '';
    found = false;
    const reversed = line.split('').reverse();
    for (let j = 0; j < reversed.length; j++) {
        if (found) {
            break;
        }
        const char = reversed[j];
        string = char + string;
        console.log('string', string);
        for (let i = 0; i < Object.keys(letters).length; i++) {
            const key = Object.keys(letters)[i];
            if (string.indexOf(key) >= 0) {
                line = line.replaceAll(key, letters[key]);
                found = true;
                break;
            }
        };
    }

    // then get the numbers
    const number = line.replace(/\D/g, "");
    // then get the first and last digit
    const toString = number.toString();
    const firstAndLast = toString[0] + toString[toString.length - 1];

    sum += parseInt(firstAndLast, 10);
});

lineReader.on("close", function () {
    console.log(sum);
});
