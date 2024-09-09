import { readFile } from 'node:fs/promises';

console.log('🎄  Day 5 Advent of Code  🎄');
console.log('    Part  2️⃣   Many Seeds!\n');

/**
* @typedef SeedsRelation
* @property {number} start start of seed relation
* @property {number} range length of seed relation
*/
/**
* @typedef Map
* @property {string} source source of the map
* @property {string} destination destination of the map
* @property {Object[]} mapLines a single relation with source, destination and length
*/
/**
* @typedef MapLine
* @property {number} source start of the source numbers
* @property {number} destination start of the destination numbers
* @property {number} range ammount of connection
*/

try {
  const inputFile = (await readFile('./input.txt', { encoding: 'utf8' })).trim();
  const inputFileSections = inputFile.split('\n\n');
  
  const seedsSection = inputFileSections.shift();
  const seedsRaw = Array.from(seedsSection.matchAll(/\d+/g)).map((match) => Number.parseInt(match[0]));
  
  let seedsRelationCollection = [];
  let maps = [];
  
  for ( let i = 0 ; i < seedsRaw.length ; i = i + 2 ){
    /**
    * @type {SeedsRelation}
    */
    let relation1 = {
      start: seedsRaw[i],
      range: seedsRaw[i+1],
    };
    seedsRelationCollection.push(relation1);
  }
  
  for (let section of inputFileSections) {
    let sectionMatchArray = section.match(/^(?<first>\w+(?=\-to\-)).*(?<second>(?<=\-to\-)\w+(?=\ {1})).*?$/m);
    let dataRows = section.split('\n');
    dataRows.shift(); //shifting out the headline to have only the contents (MapLines) remaining
    
    let mapLinesArray = [];
    /**
    * @type {Map}
    */
    let map = {
      source: sectionMatchArray.groups.first,
      destination: sectionMatchArray.groups.second,
      mapLines: mapLinesArray,
    }
    
    for (let dataRow of dataRows) {
      let numbersOfSingle = dataRow.split(' ');
      let destinationStart = Number.parseInt( numbersOfSingle[0] );
      let sourceStart = Number.parseInt( numbersOfSingle[1] );
      let connectionLength = Number.parseInt( numbersOfSingle[2] );
      
      /**
      * @type {MapLine}
      */
      let mapLine = {
        source : sourceStart,
        destination : destinationStart,
        range: connectionLength,
      }
      mapLinesArray.push(mapLine);
    }
    maps.push(map);
  }
  
  function translateSeed (seed){
    for (let map of maps){
      // console.log("For Seed " + seed + " translating from " + map.source + " to " + map.destination );
      for (let mapLine of map.mapLines){
        // console.log(mapLine);
        if (seed >= mapLine.source){
          let upperBounds = mapLine.source+mapLine.range;
          if (seed < upperBounds){
            let newSeed = mapLine.destination + (seed - mapLine.source);
            // console.log(seed + " -> " + newSeed);
            seed = newSeed;
            break; //break if any translation has happened.
          }
        }
      }
    }
    // console.log("All maps complete! Returning value " + seed + "\n\n");
    return seed;
  };
  
  let results = [];
  
  for (let relation of seedsRelationCollection) {
    for (let seed = relation.start; seed < relation.start + relation.range ; seed++){
      let result = Number.parseInt(translateSeed(seed)); //call the translateSeed function for every single seed
      results.push(result);
      results.sort((a, b) => a - b);
      if (results.length > 3){
        results.pop();
      }
    }
  }
  
  // console.log(results);
  console.log("Smallest Number in results is: " + results[0]);
  
} catch (error) {
  console.error('there was an error:', error.message);
}