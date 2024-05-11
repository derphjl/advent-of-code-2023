import { readFile } from 'node:fs/promises';
console.log('🎄 Day 3 Advent of Code\n');
try {
  const lines = (await readFile('./input.txt', { encoding: 'utf8' })).trim().split("\n");
  console.log(`🔎 Working with a total of ${lines.length} lines`);
  let runningTotal = 0;

  for ( let i = 0 ; i < lines.length ; i++ ) {
    const candidatesMatch = lines[i].matchAll(/[0-9]+/g); 
    for (let candidateMatch of candidatesMatch) {
      // console.log(candidateMatch[0]);
      const charBefore = lines[i].charAt(candidateMatch.index - 1);
      const charAfter = lines[i].charAt(candidateMatch.index + candidateMatch[0].length);

      const StartPos = (!candidateMatch.index) ? 0 : candidateMatch.index - 1;
      const EndPos = candidateMatch.index + candidateMatch[0].length + 1;

      const charAbove = lines[i-1]?.slice(StartPos, EndPos) ?? '';
      const charBelow = lines[i+1]?.slice(StartPos, EndPos) ?? '';
      
      const charsAround = [charBefore, charAfter, charAbove, charBelow];
      const containsSymbols = charsAround.filter((entry) => entry?.match(/[^\.]/));

      // console.log(`Chars ⬆️ ${charAbove} ⬇️ ${charBelow} for ${candidateMatch[0]} in line ${i}`);
      if (containsSymbols.length !== 0) {
        runningTotal += Number(candidateMatch[0]);
        // console.log(`${runningTotal} (+${candidateMatch[0]})`);
      } else {
        // console.log(`not adding ${candidateMatch[0]}`)
      }
      
    }
    // console.log(`All Matches in line ${i} done, moving to line ${i+1}`);
  }
  console.log(`\n🎁 Calculation complete! The number is ${runningTotal}\n`);
} catch (error) {
  console.error('there was an error:', error.message);
}