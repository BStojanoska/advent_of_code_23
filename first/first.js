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
};
let sum = 0;

var lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
});

lineReader.on("line", function (line) {
    // first replace all written numbers with digits, minding the order
    console.log(line);
    const split = line.split('');
    let newString = '';
    split.map((char, index) => {
        newString += char;
        if (index > 2) {
            Object.keys(letters).forEach((key) => {
                if (newString.includes(key)) {
                    line = line.replaceAll(key, letters[key]);
                    newString = '';
                }
            });
        }
    });

    console.log(line);
    // then get the numbers
    const number = line.replace(/\D/g, "");
    console.log(number);
    // then get the first and last digit
    const toString = number.toString();
    const firstAndLast = toString[0] + toString[toString.length - 1];

    console.log(firstAndLast);
    sum += parseInt(firstAndLast, 10);
    console.log('---');
});

lineReader.on("close", function () {
    console.log(sum);
});
