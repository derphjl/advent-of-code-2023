import { readFile } from 'node:fs/promises';
console.log('🎄 Advent of Code: Day 7 - Camel Cards 🎄\n');
console.log(' SPECIAL HANDLING FOR PART 2 - J IS NOW SPECIAL!');

// J has been re-introduced as a completely new card: Its single value has been demoted from between T and Q to below 2.
// -> J is now represented as "1" for the valueA calculation
// the cardTyped need reevaluation AFTER the valueA has been calculated
// J will be transformed into the most poular letter in the card, then the cardType will be evaluated again and overridden.
// This must be done *extra* so that hands without any J can just be left alone.
// !!! TBD !!

try {
  const linesOfInput = (await readFile('./input-small.txt', { encoding: 'utf8' })).trim().replaceAll('T','B').replaceAll('J','1').replaceAll('Q','D').replaceAll('K','E').replaceAll('A','F').split('\n'); //replace to make the ascii weights usable later

  let handsWithData = [];
  for (let line of linesOfInput){
    let hand = line.match(/^.*(?=\ )/g)[0]; //the hand is the first part of the string, always followed by a space
    let bid = line.match(/(?<=\ ).*$/g)[0]; //the bid is the last part of the string, always preceeded by a space
    let handSorted = hand.split('').sort().join(''); //the hand is split, sorted, and joined again. Repeating letters are together now.
    let cardType;
    if(handSorted.match(/^(.)\1{4}$/g)){
      cardType = 7; //five of a kind
    } else if (handSorted.match(/^.*(.)\1{3}.*$/g)){
      cardType = 6; //four of a kind
    } else if (handSorted.match(/^(.)\1{2}(.)\2{1}$/g) || handSorted.match(/^(.)\1{1}(.)\2{2}$/g)){
      cardType = 5; //full house = three of and two of
    } else if (handSorted.match(/^.{1}(.)\1{2}.{1}$/g) || handSorted.match(/^.{2}(.)\1{2}$/g) || handSorted.match(/^(.)\1{2}.{2}$/g)){
      cardType = 4; //three of a kind
    } else if (handSorted.match(/^.{1}(.)\1{1}(.)\2{1}$/g) || handSorted.match(/^(.)\1{1}.{1}(.)\2{1}$/g) || handSorted.match(/^(.)\1{1}(.)\2{1}.{1}$/g)){
      cardType = 3; //two pair
    } else if (handSorted.match(/^.*(.)\1{1}.*$/g)) {
      cardType = 2; //one pair
    } else {
      cardType = 1; //high card
    }
    let valueA = Number.parseInt(hand[0].charCodeAt(0) + "" + hand[1].charCodeAt(0) + hand[2].charCodeAt(0) + hand[3].charCodeAt(0) + hand[4].charCodeAt(0));
    let handWithData = {
      hand: hand,
      bid: bid,
      cardType: cardType,
      valueA : valueA,
    }
    handsWithData.push(handWithData);
  }

  console.log("Hands sorted by type (weakest (1=Highcard) to strongest (7=FiveOfKind)):");
  handsWithData.sort((a, b) => a.cardType - b.cardType);
  handsWithData.sort((a, b) => {
    if (a.cardType == b.cardType) {
      return a.valueA - b.valueA;
    } else {
      return 0;
    }
  });

  console.log(handsWithData);
  console.log();

  let endvalue = 0;
  for (let i = 0 ; i < handsWithData.length ; i++ ){
    endvalue += handsWithData[i].bid * ( i + 1);
  }

  console.log(endvalue);

} catch (error) {
  console.error('there was an error:', error.message);
}