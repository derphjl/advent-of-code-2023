import { readFile } from 'node:fs/promises';
console.log('🎄 Day 4 Advent of Code');

//"cards" shall now be an array of objects with each object being a card
//a "card" shall contain the number arrays "winning" "have", 
//the ID of the card and the quanitity with which the card is present

let cards = []

/**
* @typedef Card
* @type {{
  *   id: number;
  *   quantity: number;
  *   worth: number;
  *   winning: number[];
  *   have: number[];
  * }}
  */
  
  try {
    
    const initialCards = (await readFile('./input.txt', { encoding: 'utf8' })).trim().split("\n");
    console.log(`🔎 I see ${initialCards.length} cards`);
    let runningTotal = 0;
    
    for ( let currentCard of initialCards ) {
      
      const match = currentCard.match(/^.*?(?<card>\d*): (?<winning>.*) \| (?<have>.*)$/);
      let winningSet = Array.from(match?.groups?.winning.matchAll(/\d+/g)).map((match) => Number.parseInt(match[0]));
      let haveSet = Array.from(match?.groups?.have.matchAll(/\d+/g)).map((match) => Number.parseInt(match[0]));
      let matchQuantity = 0;
      
      for (let haveNum of haveSet) {
        matchQuantity += winningSet.includes(haveNum) ? 1 : 0;
      }
      
      /**
      * @type {Card}
      */
      let card = {
        id : parseInt(match?.groups?.card ?? 0),
        quantity: 1,
        worth: matchQuantity,
        winning: winningSet,
        have: haveSet,
        
      };
      
      let cardValue = Math.floor(Math.pow(2,(matchQuantity - 1)));
      runningTotal += cardValue;
      
    }  
    
    console.log(`\n🎁 Calculation complete! Sum of card values: ${runningTotal}\n`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }