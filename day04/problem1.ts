import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  for (const line of splitInput) {
    total += evaluateCard(line);
  }
  console.log(total);
}

function evaluateCard(line: string): number {
  let total = 0;
  const leftSide = line.substring(line.indexOf(":") + 1, line.indexOf("|") - 1).split(/\s+/);
  const winningNums = new Set<string>();
  for(const num of leftSide) {
    if(num) {
      winningNums.add(num);
    }
  }

  const rightSide = line.substring(line.indexOf("|")).split(/\s+/);
  for(const num of rightSide) {
    if(num) {
      if(winningNums.has(num)) {
        if(total === 0) {
          total = 1;
        } else {
          total *= 2;
        }
      }
    }
  }
  return total;
}

processInstructions();