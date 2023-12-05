import { readFile } from 'node:fs/promises';

console.log('🎄 Day 2 Advent of Code\n');

const availableRed = 12;
const availableGreen = 13;
const availableBlue = 14;
// TODO: This should maybe be read from a second input file I think. For now, this will do.

try {
  const contents = (await readFile('./input.txt', { encoding: 'utf8' })).trim();
  // read the file "input.txt" in the same folder with utf8 encoding, removing leading and training white space.
  // create a constant "const" with the name "contents" and write the contents of the read file there.
  // use "const" instead of "let" ("var" is deprecated) because the contents are written one, never changed after.
  // the const contents is a string after this operation.

  const games = contents.split('\n');
  // split the file along the newline character, sepperating it into multiple strings. 
  // the const games is an array of strings (or "string[]") after this operation.

  let resultSum = 0;
  let powerSum = 0;

  for (let game of games) {

    const match = game.match(new RegExp(`^Game (?<gameId>\\d+): (?<gameContent>.*)$`));
    // with the given regular expression, match against the input string (which is one line, or one "game" of all the games)
    // this creates the const "match", a RexExpMatchArray containing the capturing groups named inside the regex.
    
    const gameId = parseInt(match?.groups?.gameId);
    const gameContent = match?.groups?.gameContent;
    // from the RegExpMatchArray "match", extract the content of capturing group "gameID", writing it to the const gameId
    // same thing for gameContent

    const sets = gameContent.split(';');
    // to single out the sets within each game, i.e. the draws out of the bag, sepperate the string at the semicolon denominator.
    // keep in mind, we are already looking at a single game, which in the end can be "possible" or "impossible"

    let gamePossible = true;
    // as we start a game (or set of sets), we'll first assume the best case

    const redArray = [];
    const greenArray = [];
    const blueArray = [];
    // TODO: Create a number array for each color, empty. Find out if an array needs to be initialized with a size or if it can "grow" as it's filled.
    // TODO: Also find out, what is an "object" and could it be useful in this case?

    for (let set of sets) {
    // within one game, iterate through the single sets, which are now sepperated. each set looks like this for example: "3 red, 4 blue, 10 green"

      set = set.trim();
      // trim the leading and trailing white space. the sets are formatted as "3 red, 2 blue; 6 red, 8 blue", thus the semicolon is followed by a stray whitespace
      // after this, we habe a set, all cleaned up and ready for regexing into the different colors: blue, green and red, without set order

      let colorMatchArray = set.match(new RegExp(`^.*?(?<red>\\d*) red.*?$`));
      const red = Number.parseInt(colorMatchArray?.groups?.red ?? '0');
      redArray.push(red);

      colorMatchArray = set.match(new RegExp(`^.*?(?<green>\\d*) green.*?$`));
      const green = Number.parseInt(colorMatchArray?.groups?.green ?? '0');
      greenArray.push(green);

      colorMatchArray = set.match(new RegExp(`^.*?(?<blue>\\d*) blue.*?$`));
      const blue = Number.parseInt(colorMatchArray?.groups?.blue ?? '0');
      blueArray.push(blue);

      // with regexes, we pull the number before " red", " green" and " blue". as they have no order, this can only be done in three steps(?)
      // note, the \d has to be escaped again, making it \\d when it is written in backticks
      // we now have the numbers for the ammount of colored cubes in each set written in the variables red, green, and blue.
      // each of the colors gets checked for being "undefined" (the draw contains no such colored cubes) and is then set to zero instead
      // then, the number of cubes is added (apended) to the array of the colored cubes used to calculate the power later



      if (red > availableRed || green > availableGreen || blue > availableBlue){
        gamePossible = false;
      };
      // if one of the ammounts is too large, the set and thus the game is not possible.
      // ideally, we would discard the game here. had i structured this all differently, a more elegant solution would fork here. 
      // however, for now, well iterate though all sets of all games.
      // after incrementing through all sets with not a single one triggering this if(), we can safely assume the game to be good.

      //console.log(`I think ${red} red, ${green} green, ${blue} blue. Game ID: ${gameId} with Content: ${gameContent}, possible: ${gamePossible}`);
      // this was my development output. for the final product, it's nicer to have this not show

    };

    const powerOfGame = Math.max(...redArray) * Math.max(...greenArray) * Math.max(...blueArray);
    // using the spread syntax for imputting the arrays of the colored cubes into Math.max, 
    // multply together online the single biggest ammpunt of cubes for each number, writing the result into powerOfGame
    
    powerSum += powerOfGame;

    if (gamePossible) {
      resultSum += gameId;
    }
    // if the game turned out to be possible, we want the gameId added to the total Result.
    // if the game was impossible, this if() will not be eecuted, jumping to the next game

 }

 console.log(`The sum of all possible games (that is, the result for Part 1): ${resultSum} 🎉\nThe sum of all powers (that is, the result for Part 2) is: ${powerSum} 🎉`);

} catch (error) {
  console.error('there was an error:', error.message);
}