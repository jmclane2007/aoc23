import * as fs from 'fs';

const MAX_RED = 12
const MAX_BLUE = 14;
const MAX_GREEN = 13

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  for (const line of splitInput) {
    const colonIndex = line.indexOf(":");
    // parse game ID
    const gameId = Number.parseInt(line.substring(5, colonIndex));
    const gameText = line.substring(colonIndex + 2);
    // split games, determine if each one is possible
    if(gameIsPossible(gameText)) {
      total += gameId;
    }
  }
  console.log(total);
}

function gameIsPossible(gameText: string): boolean {
  const games = gameText.split("; ");
  for(let i = 0; i < games.length; i++) {
    const cubes = games[i].split(", ");
    for(let j = 0; j < cubes.length; j++) {
      const spaceIndex = cubes[j].indexOf(" ");
      const color = cubes[j].substring(spaceIndex + 1);
      const cubeNum = Number.parseInt(cubes[j].substring(0, spaceIndex));
      if(color === "red") {
        if(cubeNum > MAX_RED) {
          return false;
        }
      } else if(color === "blue") {
        if(cubeNum > MAX_BLUE) {
          return false;
        }
      } else {
        if(cubeNum > MAX_GREEN) {
          return false;
        }
      }
     }
  }
  return true;
}

processInstructions();