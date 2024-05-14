import { readFile } from 'node:fs/promises';
console.log('🎄 Day 4 Advent of Code');
try {
  
  const lines = (await readFile('./input.txt', { encoding: 'utf8' })).trim().split("\n");
  console.log(`🔎 I see ${lines.length} cards`);
  let runningTotal = 0;
  
  for ( let line of lines ) {
    
    const matchesInLine = line.match(/^.*?(?<card>\d*): (?<winning>.*) \| (?<have>.*)$/);
    const cardID = parseInt(matchesInLine?.groups?.card ?? 0);
    const winningSet = matchesInLine?.groups?.winning.split(/(?<=\d)\s/).map(element => parseInt(element.trim()));
    const haveSet = matchesInLine?.groups?.have.split(/(?<=\d)\s/).map(element => parseInt(element.trim()));
    let matchQuantity = 0;
    
    for (let haveNum of haveSet) {
      matchQuantity += winningSet.includes(haveNum) ? 1 : 0;
    }
    
    let cardValue = Math.floor(Math.pow(2,(matchQuantity - 1)));
    runningTotal += cardValue;

  }  
  
  console.log(`\n🎁 Calculation complete! Sum of card values: ${runningTotal}\n`);
} catch (error) {
  console.error('there was an error:', error.message);
}