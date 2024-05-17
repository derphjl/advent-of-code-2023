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
    
    //initialize the cards set by going through the inpt and extracting the card data and filling up the "cards" array
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
      
      runningTotal +=  Math.floor(Math.pow(2,(matchQuantity - 1)));
      cards.push(card);

    }
    
    //the array "cards" is now filled with all cards, 
    //but the worth has not yet been translated in the cards won "further down the list"
    
    for (let card of cards) {
      for ( let h = 1 ; h <= card.quantity ; h++ ) {
        for ( let i = card.id ; i < card.id + card.worth ; i ++ ) {
          cards[i].quantity++;
        }
      }
    }
    
    let totalNumberOfCards = cards.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

    console.log(`\n🎁 Calculation complete!`);
    console.log(`🎁 Sum of Card Values (Part 1): ${runningTotal}`);
    console.log(`🎁  Ammount of Cards  (Part 2): ${totalNumberOfCards}\n`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }