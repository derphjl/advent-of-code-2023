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
  const inputFile = (await readFile('./input-small.txt', { encoding: 'utf8' })).trim();
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
  
  function translateSeed (seed){
    return 1;
    // for (let map of maps){
    //   /**
    //   * 
    //   * 
    //   * 
    //   * TODO: DO
    //   * 
    //   * 
    //   * 
    //   */
    // }
  };
  
  let results = [];
  
  for (let relation of seedsRelationCollection) {
    for (let seed = relation.start; seed < relation.start + relation.range ; seed++){
      let result = translateSeed(seed); //call the translateSeed function for every single seed
      results.push(result);
    }
  }
  
  results.sort((a, b) => a - b);
  console.log(results);
  console.log("Smallest Number in results is: " + results[0]);
  
  
  
  
  // let relationsCatalouge = [];
  
  
  // for (let section of sections) {
  //   let sectionMatchArray = section.match(/^(?<first>\w+(?=\-to\-)).*(?<second>(?<=\-to\-)\w+(?=\ {1})).*?$/m);
  //   let mappingSource = sectionMatchArray?.groups?.first ?? 'fail';
  //   let mappingDestination = sectionMatchArray?.groups?.second ?? 'fail';
  //   console.log("Writing Map from " + mappingSource + " to " + mappingDestination + "... done!");
  
  //   let sectionSingles = section.split('\n');
  
  //   //because the headline "x-to-y (...)" is still an array element at this point, we shift it out. The "header" has
  //   //already been processed with the regex earlier, extracting first and second. Further down, we only want the 'contet'
  //   //for the mapping.
  //   sectionSingles.shift();
  
  //   let connection1 = [];
  //   /**
  //   * @type {RelationInstance}
  //   */
  //   let currentRelationInstance = {
  //     sourceName: mappingSource,
  //     destinationName: mappingDestination,
  //     connections: connection1,
  //   };
  
  //   for (let sectionSingle of sectionSingles) {
  //     let numbersOfSingle = sectionSingle.split(' ');
  //     let destinationStart = Number.parseInt( numbersOfSingle[0] );
  //     let sourceStart = Number.parseInt( numbersOfSingle[1] );
  //     let connectionLength = Number.parseInt( numbersOfSingle[2] );
  
  //     /**
  //     * @type {Connection}
  //     */
  //     let activeConnection = {
  //       sourceNumberStart : sourceStart,
  //       destinationNumberStart : destinationStart,
  //       connectionLength: connectionLength,
  //     }
  //     connection1.push(activeConnection);
  //   }
  //   relationsCatalouge.push(currentRelationInstance);
  // }
  
  
  // let workingArray = seeds;
  
  
  // for (let relation of relationsCatalouge) {
  //   console.log();
  //   console.log("🔍 Analyzing Relation " + relation.sourceName + " to " + relation.destinationName);
  //   console.log();
  
  //   let convertedArray = [];
  
  //   for(let workingElement of workingArray){ 
  //     let convertedElement = workingElement;
  //     for (let connection of relation.connections){
  //       let sourceNumberEnd = connection.sourceNumberStart + connection.connectionLength;
  
  //       if ((workingElement >= connection.sourceNumberStart) && (workingElement < sourceNumberEnd)) {
  //         let distance = workingElement - connection.sourceNumberStart;
  //         convertedElement = connection.destinationNumberStart + distance;
  //         //console.log("Change applied " + workingElement + " -> " + convertedElement);
  //       }
  //     }
  //     convertedArray.push(convertedElement);
  //   }
  //   workingArray = convertedArray;
  // }  
  
  
  
  
  
  
  
  
  
  
} catch (error) {
  console.error('there was an error:', error.message);
}