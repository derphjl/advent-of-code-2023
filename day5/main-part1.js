import { readFile } from 'node:fs/promises';
import { connect } from 'node:http2';

console.log('🎄 Day 5 Advent of Code 🎄\n');


try {
  
  //read the input file and trim the edges, removing white spaces and newlines at the ends.
  //write the contens into the contents constant. this will not be changed now, only read.
  const contents = (await readFile('./input.txt', { encoding: 'utf8' })).trim();
  
  //contents is one long string, but logically devided by double new lines, so we rip it apart at those seams
  //as a result, we get an array of sections, which is an array of strings
  const sections = contents.split('\n\n');
  
  //create a seeds constant (this will fold into a number array, but thats typing at work)
  //create an array from the coming input. Using the first element in secitons (=[0]) as an input,
  //match a RegEx "\d+" (that is, "one or more digits"). Use the global flag (this is required in this use of MatchAll.)
  //The global Flag retains the index after a match and keeps going until all candidates have been matched.
  //Were we not to set the global flag, matchAll would not work. Next, we get an RegExpExecArray, so an array decribing
  //the matches, their index position, etc. However, we only need the matches themselves, so we throw them in an 
  //arrow function. This arrow-function pulls out the first element of each item, turning the whole thing from an array
  //of arrays (that is, an array of matches with every match being an array of properties of a single match) back into
  //simply an array of matches. Within the mapping function, we also parse the input as an integer, so a seed not
  //called a number would fail here. This can't hapen anyway as anything that is not a "one or more digits" would
  //not have passed the regex earlier. What this does, however, is strictly tie down the typing so that it is 100%
  //sure that we are working with an array of ints now.
  //We will work with the seeds later, first we have to build all the matching-maps
  const seeds = Array.from(sections[0].matchAll(/\d+/g)).map((match) => Number.parseInt(match[0]));
  
  console.log("🌱 The input Seeds are: 🌱");
  console.log(seeds);
  console.log();

  //the input provides a few maps that the seed will have to "jump trough" to get to their "location" in the end. 
  //We will create an array of maps. First, we will get the type notations right, doing TypeScript light so to speak.
  //The Type definitions *should* go to top op file - i think - but this will work just fine as we will only be using
  //them from here on out, post-declaration
  
  //The "RelationInstance" is any one of the soil-to-fertilizer, fertilizer-to-water, etc. mappings. 
  //It has a name ('soil-to-fetilizer', we'll keep the naming consistent with the input) and the correspoding map
  //This builds practically the innermost layer, holding only the string object 'name' and the map object 'map'
  /**
  * 
  * @typedef RelationInstance
  * @type {{
  *   sourceName: string;
  *   destinationName: string;
  *   connections: Connection[];
  * }}
  */
  
  /**
  * 
  * @typedef Connection
  * @type {{
  *   sourceNumberStart: int;
  *   destinationNumberStart: int;
  *   connectionLength: int;
  * }}
  */
  
  let relationsCatalouge = [];
  
  //Shift out the seeds, leaving only the map sections.
  sections.shift();
  
  for (let section of sections) {
    
    //Fucking Shit, a Regex, and what a beast.  '^' matches the start of the string. (?<first>...) 
    //is a named capture group called "first". It matches a set of one or more characters (that's the '\w'). 
    //After that comes a "positive lookahead". This will not be included in the match, but it has to follow 
    //after (that's '(?=...)'). It matches the "-to-", with the "-"'s having to be escaped (\). 
    //Thereafter, zero to infinity (*) of any character (.), followed by the capture group "second" which 
    //works with a positive look_behind_ (that's "(?<=...)") so the phrase has to be _preceeded_ by "-to-"
    //with the dashes having to be escaped again. Following the "-to-" comes one or more (+) characters (\w), 
    //followed by a positive lookahead for exactly one space in another positive lookahead. Phew!
    //Ager this, that follows is 0 or more (*) of any character (.) in lazy (?) until the end of the input ($)
    //Also, this all needs to work with the still multiline input, thus /m.
    let sectionMatchArray = section.match(/^(?<first>\w+(?=\-to\-)).*(?<second>(?<=\-to\-)\w+(?=\ {1})).*?$/m);
    
    let mappingSource = sectionMatchArray?.groups?.first ?? 'fail';
    let mappingDestination = sectionMatchArray?.groups?.second ?? 'fail';
    console.log("Writing Map from " + mappingSource + " to " + mappingDestination + "... done!");
    
    let sectionSingles = section.split('\n');
    
    //because the headline "x-to-y (...)" is still an array element at this point, we shift it out. The "header" has
    //already been processed with the regex earlier, extracting first and second. Further down, we only want the 'contet'
    //for the mapping.
    sectionSingles.shift();
    
    let connection1 = [];
    /**
    * @type {RelationInstance}
    */
    let currentRelationInstance = {
      sourceName: mappingSource,
      destinationName: mappingDestination,
      connections: connection1,
    };
    
    for (let sectionSingle of sectionSingles) {
      let numbersOfSingle = sectionSingle.split(' ');
      let destinationStart = Number.parseInt( numbersOfSingle[0] );
      let sourceStart = Number.parseInt( numbersOfSingle[1] );
      let connectionLength = Number.parseInt( numbersOfSingle[2] );
      
      /**
      * @type {Connection}
      */
      let activeConnection = {
        sourceNumberStart : sourceStart,
        destinationNumberStart : destinationStart,
        connectionLength: connectionLength,
      }
      connection1.push(activeConnection);
    }
    relationsCatalouge.push(currentRelationInstance);
  }
  
  let workingArray = seeds;
  
  for (let relation of relationsCatalouge) {
    console.log();
    console.log("🔍 Analyzing Relation " + relation.sourceName + " to " + relation.destinationName);
    console.log();
    
    let convertedArray = [];
    
    for(let workingElement of workingArray){ 
      let convertedElement = workingElement;
      for (let connection of relation.connections){
        let sourceNumberEnd = connection.sourceNumberStart + connection.connectionLength - 1;
        
        if ((workingElement >= connection.sourceNumberStart) && (workingElement <= sourceNumberEnd)) {
          let distance = workingElement - connection.sourceNumberStart;
          convertedElement = connection.destinationNumberStart + distance;
          console.log("Change applied " + workingElement + " -> " + convertedElement);
        }
      }
      convertedArray.push(convertedElement);
    }
    workingArray = convertedArray;
  }  

  console.log("\nAll maps analyzed, the resulting array is"); 
  console.log(workingArray);
  console.log("\nThe smallest numer is " + workingArray.sort((a, b) => a - b)[0] + "\n");
    
} catch (error) {
  console.error('there was an error:', error.message);
}