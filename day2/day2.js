import * as fs from 'fs';
import * as readline from 'node:readline/promises';

const filename = 'input.txt';
const inputStream = fs.createReadStream(filename);

const limit = {
    red: 12,
    green: 13,
    blue: 14,
}

let sum = 0;
let sum2 = 0;

var lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
});

const parseGame = (game) => {
    let gm = {
        red: 0,
        green: 0,
        blue: 0,
    };

    const sets = game.split(',');
    sets.forEach((set) => {
        const trimmed = set.trim();
        const split = trimmed.split(' ');

        const number = Number(split[0]);
        const color = split[1].trim();
        gm[color] = number;
    });

    return gm;
}

const parseLine = (line) => {
    let game = {
        id: null,
        red: 0,
        green: 0,
        blue: 0,
    };

    const split = line.split(':');
    const gameID = split[0].replace(/\D/g, "");
    game.id = gameID;

    const playedGamesArray = split[1].split(';');
    playedGamesArray.forEach((playedGame) => {
        const results = parseGame(playedGame);
        if (results) {
            results.red > game.red ? game.red = results.red : null;
            results.green > game.green ? game.green = results.green : null;
            results.blue > game.blue ? game.blue = results.blue : null;
        }
    });

    return game;
}

const analyzeGame = (game) => {
    if (game.red <= limit.red && game.green <= limit.green && game.blue <= limit.blue) {
        return game;
    } else {
        return null;
    }
}

const getPower = (game) => {
    return game.red * game.green * game.blue;
}

const partOne = (line) => {
    const game = parseLine(line);
    const result = analyzeGame(game);

    if (result) {
        sum += Number(result.id);
    }
}

const partTwo = (line) => {
    const game = parseLine(line);

    if (game) {
        const power = getPower(game);
        sum2 += Number(power);
    }
}

const partOneLogger = () => {
    console.log(`The sum of the IDs of the games that can be played is ${sum}`);
}

const partTwoLogger = () => {
    console.log(`The sum of the power of the games that can be played is ${sum2}`);
}

lineReader.on("line", function (line) {
    partOne(line);
    partTwo(line);
});


lineReader.on("close", function () {
    partOneLogger();
    partTwoLogger();
});
