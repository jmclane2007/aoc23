import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  
  const time = Number.parseInt(splitInput[0].substring(splitInput[0].indexOf(":") + 1).replace(/\s+/g, ""));
  const record = Number.parseInt(splitInput[1].substring(splitInput[1].indexOf(":") + 1).replace(/\s/g, ""));
  // skip 0 and max time since we can't win with those
  // Only count until we find a winner
  for(let j = 1; j < time / 2; j++) {
    if((time - j) * j > record) {
      if(total === 0) {
        total = time - (2 * j) + 1
      } else {
        total *= (time - (2 * j) + 1);
      }
      break;
    }
  }
  console.log(total);
}


processInstructions();