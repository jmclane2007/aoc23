import * as fs from 'fs';

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
    total += powerOfGame(gameText);
  }
  console.log(total);
}

function powerOfGame(gameText: string): number {
  let total = 0;
  const games = gameText.split("; ");
  let maxRed = 0;
  let maxBlue = 0;
  let maxGreen = 0;
  for(let i = 0; i < games.length; i++) {
    const cubes = games[i].split(", ");
    for(let j = 0; j < cubes.length; j++) {
      const spaceIndex = cubes[j].indexOf(" ");
      const color = cubes[j].substring(spaceIndex + 1);
      const cubeNum = Number.parseInt(cubes[j].substring(0, spaceIndex));
      if(color === "red") {
        maxRed = Math.max(cubeNum, maxRed);
      } else if(color === "blue") {
        maxBlue = Math.max(cubeNum, maxBlue);
      } else {
        maxGreen = Math.max(cubeNum, maxGreen);
      }
    }
  }
  return maxRed * maxBlue * maxGreen;
}

processInstructions();