import { readFile } from 'node:fs/promises';
console.log('🎄 Advent of Code: Day 7 - Camel Cards 🎄\n');

try {
  const linesOfInput = (await readFile('./input-small.txt', { encoding: 'utf8' })).trim().split('\n');
  
  let handsWithBids = [];
  for (let line of linesOfInput){
    let hand = line.match(/^.*(?=\ )/g)[0];
    let bid = line.match(/(?<=\ ).*$/g)[0];
    let handWithBid = {
      hand: hand,
      bid: bid,
    }
    handsWithBids.push(handWithBid);
    let handSplit = hand.split('').sort();
    console.log(handSplit);
    let letter0 = handSplit[0];
    let count = 0;
    for (let letter of handSplit){
      // if ( letter = letter0 ) {
      //   console.log("Letter " + letter + " is same as letter 0 " + letter0);
      //   count++;
      //   console.log("Count is now " + count);
      // }
    }
  }

  console.log("Hands With Bids:");
  console.log(handsWithBids);

} catch (error) {
  console.error('there was an error:', error.message);
}