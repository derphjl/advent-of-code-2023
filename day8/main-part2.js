import { readFile } from 'node:fs/promises';
console.log('🎄 Day 8 Part 2 - 👻 Ghosts navigating the desert... 🎄\n');

try {
  const lines = (await readFile('./input-small-part2.txt', { encoding: 'utf8' })).trim().split('\n'); //import file
  let moves = lines.shift();   //first line gives the movement string
  moves = moves.split('');
  lines.shift();               //shift out emptyline
  let nodes = [];
  
  //### Match the various parts of the input file and commit them to an orderly data structure ###
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
  
  console.log('nodes');
  console.log(nodes);
  
  //### Select the "Start Nodes" -> All nodes that End in "A". Commit these to workingNodes[]
  let workingNodes = nodes.filter((node) => node.start.match(/^.*A$/g));
  console.log('Working Nodes at Start:');
  console.log(workingNodes);
  
  let stepCount = 0;
  
  //### For all of the Start Nodes, step through all the movement instructions, one instruction at a time ###
  do {
    for (let move of moves) {
      stepCount++;
      for (let i = 0; i < workingNodes.length; i++) {
        let nextStart;
        if (move == 'L') { 
          nextStart = workingNodes[i].left;
        };
        if (move == 'R') { 
          nextStart = workingNodes[i].right;
        };
        workingNodes[i] = nodes.find((a) => a.start === nextStart);      
      }
    }
  } while (workingNodes.filter((a) => a.start.match(/^.*Z$/g)).length < workingNodes.length);
  console.log(stepCount + ' Steps Moved, WorkingNodes now:');
  console.log(workingNodes);
  
  
  //console.log(stepCount);
  
} catch (error) {
  console.error('there was an error:', error.message);
}