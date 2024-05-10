import { readFile } from 'node:fs/promises';

console.log('🎄 Day 3 Advent of Code\n');

// If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.
// Any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

try {
  const input = (await readFile('./input.txt', { encoding: 'utf8' })).trim();
  
  // console.log(input);
  
  const lines = input.split("\n");
  
  console.log(`🔎 Working with a total of ${lines.length} lines\n`);
  
  let runningTotal = 0;
  
  // usually, one would use "for (let line of lines) {" here. however, we need to use the index position to check the lines above and below. therefore, we need to walk the walk... and do it the slow way.
  for ( let i = 0 ; i < lines.length ; i++ ) {
    const candidatesMatch = lines[i].matchAll(/\d+/g); 
    
    for (let candidateMatch of candidatesMatch) {
      
      // console.log("Match print:");
      // console.log(candidateMatch);
      
      //first, let's establish the corner cases: We need "special treatment" if:
      // * a symbol is in the first line (there is no above)
      // * a symbol is in the last line (there is no below)
      // * a symbol is at the beginning of a line (there is no before)
      // * a symbol is at the end of a line (there is no after) (of course, mind the length!)
      const symbolIsAtBeginningOfLine = !candidateMatch.index;
      const symbolIsAtEndOfLine = (candidateMatch.index >= (candidateMatch.input.length - candidateMatch[0].length));
      const symbolIsInFirstLine = i === 0;
      const symbolIsInLastLine = i === (lines.length - 1);
      
      let symbolBefore = 'error';
      if (symbolIsAtBeginningOfLine) {
        symbolBefore = '.';
      } else {
        symbolBefore = lines[i].at(candidateMatch.index-1);
      }
      
      let symbolAfter = 'error';
      if (symbolIsAtEndOfLine) {
        symbolAfter = '0';
      } else {
        symbolAfter = lines[i].at(candidateMatch.index+candidateMatch[0].length);
      }
      
      let symbolsAbove = 'error!'; //by first setting it to error, cases in which the value is not overridden will be noticable.
      //now, above, easiest first, if it is not at the beginning or the end of the line and also not in the first line. 
      //the space "around above" (so start -1 to end +1 is free)
      if ((!symbolIsInFirstLine && !symbolIsAtBeginningOfLine) && !symbolIsAtEndOfLine) {
        symbolsAbove = lines[i-1]?.slice((candidateMatch.index-1),(candidateMatch.index+candidateMatch[0].length+1));
      }
      //special case one: symbol is in the first line. there is simply no above.
      if (symbolIsInFirstLine) {
        symbolsAbove = '.';
      }
      //special case two: symbol is at the beginning of the line, but not in the first line
      //counting "above" has to start at the symbol index, not one before because that does not exist
      if (!symbolIsInFirstLine && symbolIsAtBeginningOfLine) {
        symbolsAbove = lines[i-1]?.slice((candidateMatch.index),(candidateMatch.index+candidateMatch[0].length+1));
      }
      //special case three: symbol is at the end of the line, but not in the first line
      //counting "above" has to end at the last symbol position and not continue further
      if (!symbolIsInFirstLine && symbolIsAtEndOfLine) {
        symbolsAbove = lines[i-1]?.slice((candidateMatch.index-1),(candidateMatch.index+candidateMatch[0].length));
      }
      
      let symbolsBelow = 'error!'; //by first setting it to error, cases in which the value is not overridden will be noticable.
      //now, below, easiest first, if it is not at the beginning or the end of the line and also not in the last line. 
      //the space "around above" (so start -1 to end +1 is free)
      if ((!symbolIsInLastLine && !symbolIsAtBeginningOfLine) && !symbolIsAtEndOfLine) {
        symbolsBelow = lines[i+1].slice((candidateMatch.index-1),(candidateMatch.index+candidateMatch[0].length+1));
      }
      //special case one: symbol is in the first line. there is simply no above.
      if (symbolIsInLastLine) {
        symbolsBelow = '.';
      }
      //special case two: symbol is at the beginning of the line, but not in the last line
      //counting "below" has to start at the symbol index, not one before because that does not exist
      if (!symbolIsInLastLine && symbolIsAtBeginningOfLine) {
        symbolsBelow = lines[i+1].slice((candidateMatch.index),(candidateMatch.index+candidateMatch[0].length+1));
      }
      //special case three: symbol is at the end of the line, but not in the last line
      //counting "below" has to end at the last symbol position and not continue further
      if (!symbolIsInLastLine && symbolIsAtEndOfLine) {
        symbolsBelow = lines[i-1]?.slice((candidateMatch.index-1),(candidateMatch.index+candidateMatch[0].length));
      }
      
      const symbolsAround = symbolBefore.concat(symbolsBelow,symbolAfter,symbolsAbove);
      const numberIsRelevant = symbolsAround.match(/[^\.]/) ? true : false;
      
      if (numberIsRelevant) {
        runningTotal += parseInt(candidateMatch[0]);
        console.log(`  Relevant ${candidateMatch[0]} in line ${i}. Total now at ${runningTotal}`)
      } else {
        console.log(`Irrelevant ${candidateMatch[0]} in line ${i}.`);
      }
    }
    console.log(`All Matches in line ${i} done, moving to line ${i+1}`);
  }
  console.log(`🎁 Calculation complete! The number is ${runningTotal}\n`);
} catch (error) {
  console.error('there was an error:', error.message);
}