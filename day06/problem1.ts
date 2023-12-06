import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  
  const trimmed = splitInput[0].substring(splitInput[0].indexOf(":") + 1).trim();
  const times = trimmed.split(/\s+/).map(str => Number.parseInt(str));
  const records = splitInput[1].substring(splitInput[1].indexOf(":") + 1).trim().split(/\s+/).map(str => Number.parseInt(str));
  for(let i = 0; i < times.length; i++) {
    // skip 0 and max time since we can't win with those
    // Only count until we find a winner
    for(let j = 1; j < times[i] / 2; j++) {
      if((times[i] - j) * j > records[i]) {
        if(total === 0) {
          total = (times[i] + 1)  - (2 * j)
        } else {
          total *= ((times[i] + 1)  - (2 * j));
        }
        break;
      }
    }
  }
  console.log(total);
}


processInstructions();