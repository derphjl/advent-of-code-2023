import { readFile } from 'node:fs/promises';
console.log('🎄 Day 8 Part 2 - 👻 Ghosts navigating the desert... 🎄\n');

try {
  const lines = (await readFile('./input-small-part2.txt', { encoding: 'utf8' })).trim().split('\n'); //import file
  let moves = lines.shift();   //first line gives the movement string
  moves = moves.split('');
  lines.shift();                //shift out emptyline
  let nodes = [];
  
  for (let singleNode of lines) {
    let match = singleNode.match(/^(?<start>\w{3}).*(?<left>\w{3}),\ (?<right>\w{3}).*$/);   //regex out all elements of the node
    let start = match?.groups?.start;
    let left = match?.groups?.left;
    let right = match?.groups?.right;
    let node = {
      start: start,
      left: left,
      right: right,
    }
    nodes.push(node);
  }
  
  let currentStart = 'AAA';
  let currentIndex = nodes.findIndex((a) => a.start == currentStart);   //find the index position of the currentpos
  let stepCount = 0;
  
  //console.log(stepCount);
  console.log();
  
} catch (error) {
  console.error('there was an error:', error.message);
}