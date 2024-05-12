import { readFile } from 'node:fs/promises';
console.log('🎄 Day 3 Advent of Code\n');
try {
  const lines = (await readFile('./input.txt', { encoding: 'utf8' })).trim().split("\n");
  
  console.log(`🔎 Working with a total of ${lines.length} lines.`);
  
  let runningTotal = 0;
  let gearRatioSum = 0;
  
  let starArray = [];
  
  for ( let i = 0 ; i < lines.length ; i++ ) {
    const partNumberMatch = lines[i].matchAll(/[0-9]+/g); 
    for (let partCandidate of partNumberMatch) {
      const startPos = (!partCandidate.index) ? 0 : partCandidate.index - 1;
      const endPos = partCandidate.index + partCandidate[0].length + 1;
      const charBefore = lines[i].charAt(partCandidate.index - 1);
      const charAfter = lines[i].charAt(partCandidate.index + partCandidate[0].length);
      const charAbove = lines[i-1]?.slice(startPos, endPos) ?? '';
      const charBelow = lines[i+1]?.slice(startPos, endPos) ?? '';
      const charsAround = [charBefore, charAfter, charAbove, charBelow];
      
      const containsSymbols = charsAround.filter((entry) => entry?.match(/[^\.]/));
      
      if (containsSymbols.length !== 0) {
        runningTotal += Number(partCandidate[0]);
      };
      
      //Step Two: Gear Ratios: Find out if a star is connected to exactly two numbers...
      
      const containsStar = charsAround.filter((entry) => entry?.match(/\*/g));
      
      if (containsStar.length > 1) {
        console.error('A number in the input set is surrounded by more than one star! This is not supported.');
      };
      if (containsStar.length > 0) {  //a relevant star is found, note its position
        let currentX,currentY; 
        
        //check the lines above, at, and below to get the coordinates of the star
        //indexOf does not take and end position, so checking has to be done the long way.
        for (let k = i-1 ; k < i+2 ; k++ ){ 
          let tempX = lines[k].indexOf(`*`, startPos);
          if ((tempX > -1) && (tempX < endPos)) {
            currentX = tempX;
            currentY = k;
          }
        }
        
        //stars are stored in starArray with the numbers surrounding them
        if (starArray.findIndex((entry) => (entry.x === currentX) && (entry.y === currentY)) === -1) {
          //the star is not yet in the array, add it.
          let singleStar = {
            x: currentX,
            y: currentY,
            num: [],
          };
          starArray.push(singleStar);
        };

        //push the current partCandidate onto the star matching the coordinates just found
        starArray[starArray.findIndex((entry) => (entry.x === currentX) && (entry.y === currentY))].num.push(Number(partCandidate[0]));
      }
    }
  }

  starArray = starArray.filter((entry) => entry.num.length === 2);

  for (let star of starArray) {
    //create a gear ratio for a star by multiplying the two nums
    let gearRatio = star.num[0] * star.num[1];
    gearRatioSum += gearRatio;
  }
  
  console.log(`\n🎁 Calculation complete! Sum of part numbers: ${runningTotal}  sum of gear ratios: ${gearRatioSum}\n`);

} catch (error) {
  console.error('there was an error:', error.message);
}