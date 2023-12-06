import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split(/[-a-z:]+/);
  const seeds = splitInput[1].trim().split(/\s+/).map(str => Number.parseInt(str));
  let minLocation = Number.MAX_SAFE_INTEGER;
  for(const seed of seeds) {
    let seedValue = seed;
    // 7 range conversions
    for(let i = 0; i < 7; i++) {
      const map = splitInput[3 + (2 * i)].trim();
      const ranges = map.split("\r\n");
      for(const range of ranges) {
        const values = range.split(/\s+/).map(str => Number.parseInt(str))
        if(seedValue >= values[1] && seedValue < values[1] + values[2]) {
          seedValue = seedValue + (values[0] - values[1]);
          break;
        }
      }
    }
    minLocation = Math.min(minLocation, seedValue)
  }
  console.log(minLocation);
}


processInstructions();