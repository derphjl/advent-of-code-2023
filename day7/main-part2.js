import { count } from 'node:console';
import { readFile } from 'node:fs/promises';
console.log('🎄 Advent of Code: Day 7 - Camel Cards 🎄');
console.log('SPECIAL HANDLING FOR PART 2 - J IS NOW SPECIAL!\n');

try {
  const linesOfInput = (await readFile('./input.txt', { encoding: 'utf8' })).trim().replaceAll('J','1').replaceAll('T','B').replaceAll('Q','D').replaceAll('K','E').replaceAll('A','F').split('\n'); //replace to make the ascii weights usable later

  let handsWithData = [];
  for (let line of linesOfInput){
    let hand = line.match(/^.*(?=\ )/g)[0]; //the hand is the first part of the string, always followed by a space
    let bid = line.match(/(?<=\ ).*$/g)[0]; //the bid is the last part of the string, always preceeded by a space
    let valueA = Number.parseInt(hand[0].charCodeAt(0) + "" + hand[1].charCodeAt(0) + hand[2].charCodeAt(0) + hand[3].charCodeAt(0) + hand[4].charCodeAt(0));
    let handSorted = hand.split('').sort().join(''); //the hand is split, sorted, and joined again. Repeating letters are together now.
    let cardType;

    if(handSorted.match(/^.*1.*$/g)){ //special case: J included (It's a 1!)
      console.log("\nSpectial Case J!")
      const counts = {};
      for (let character of handSorted.split('')){
        counts[character] = counts[character] ? counts[character] + 1 : 1;
      };
      counts[1] = 0;
      let quantityOfMVC = Object.values(counts).sort((a, b) => b - a)[0]
      let mostValuableCharacter = Object.keys(counts).find(key => counts[key] === quantityOfMVC);
      let onlyBiggestCounts = Object.values(counts).filter((a) => a >= quantityOfMVC);
      console.log("MVC may be " + mostValuableCharacter + "...");
      if (onlyBiggestCounts.length > 1){
        let possibleMVC = Object.keys(counts).filter(key => counts[key] === quantityOfMVC); 
        console.log("Possible MVCs are: " + possibleMVC);
        mostValuableCharacter = possibleMVC.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))[0];
        console.log("Assumption was wrong: MVC is instead " + mostValuableCharacter + "!")
      } else if (onlyBiggestCounts.length == 1){
        console.log("MVC is definetly " + mostValuableCharacter + "!");
      }
      //sort not by any arbitraty thing, but by ascii code!
      let handSortedOld = handSorted;
      handSorted = handSorted.replaceAll('1', mostValuableCharacter);
      console.log(handSortedOld + " -> " + handSorted);
    }

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

    let handWithData = {
      hand: hand,
      bid: bid,
      cardType: cardType,
      valueA : valueA,
    }
    handsWithData.push(handWithData);
  }

  console.log("\nHands sorted by type (weakest (1=Highcard) to strongest (7=FiveOfKind)):");
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