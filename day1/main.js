import { readFile } from 'node:fs/promises';

console.log('🎄 Day 1 Advent of Code\n');

const digitWordMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const digitWordRegExpFragment = Object.keys(digitWordMap).join('|');

try {
  const contents = (await readFile('input.txt', { encoding: 'utf8' })).trim();

  const lines = contents.split('\n');

  let result = 0;

  for (let line of lines) {

    const matchMultiple = line.match(new RegExp(`^.*?(?<first>\\d|${digitWordRegExpFragment}).*(?<last>\\d|${digitWordRegExpFragment}).*?$`));
    const matchSingle = line.match(new RegExp(`^.*?(?<first>\\d|${digitWordRegExpFragment}).*$`));

    let firstDigit = matchMultiple?.groups?.first || matchSingle?.groups?.first;
    let lastDigit = matchMultiple?.groups?.last || matchSingle?.groups?.first;
    
    if (!firstDigit || !lastDigit) continue;

    if (firstDigit in digitWordMap) {
      firstDigit = digitWordMap[firstDigit];
    };

    if (lastDigit in digitWordMap) {
      lastDigit = digitWordMap[lastDigit];
    };

    const combinedDigits = [firstDigit, lastDigit].join('');
    const lineResult = Number.parseInt(combinedDigits);

    console.log(
      line,
      lineResult
    );

    result += lineResult;
  }

  console.log(`\nResult: ${result} 🎉`);    

} catch (error) {
  console.error('there was an error:', error.message);
}
