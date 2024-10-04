import { readFile } from 'node:fs/promises';
console.log('🎄 Day 8 Part 2 - 👻 Ghosts navigating the desert... 🎄\n');

try {
  const lines = (await readFile('./input.txt', { encoding: 'utf8' })).trim().split('\n'); //import file
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
  
  do{
    for (let move of moves) {
      let nextIndex;
      let nextStart;
      switch (move) {
        case 'L':
        nextStart = nodes[currentIndex].left;
        nextIndex = nodes.findIndex((a) => a.start == nextStart);
        break;
        case 'R':
        nextStart = nodes[currentIndex].right;
        nextIndex = nodes.findIndex((a) => a.start == nextStart);
        break;
        default:
        console.log(`Sorry, we are out.`);
      }
      currentIndex = nextIndex;
      stepCount++;
    }
  } while (nodes[currentIndex].start != 'ZZZ');

  console.log(stepCount);
  console.log();
  
} catch (error) {
  console.error('there was an error:', error.message);
}