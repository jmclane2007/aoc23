import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  const cardSum = new Array(splitInput.length).fill(1);
  for (let i = 0; i < splitInput.length; i++) {
    evaluateCard(splitInput[i], i, cardSum);
  }
  let total = 0;
  for(const sum of cardSum) {
    total += sum;
  }
  console.log(total);
}

function evaluateCard(line: string, index: number, cardSum: number[]): number {
  let total = 0;
  const leftSide = line.substring(line.indexOf(":") + 1, line.indexOf("|") - 1).split(/\s+/);
  const winningNums = new Set<string>();
  for(const num of leftSide) {
    if(num) {
      winningNums.add(num);
    }
  }

  const rightSide = line.substring(line.indexOf("|")).split(/\s+/);
  let winnings = 0;
  for(const num of rightSide) {
    if(num) {
      if(winningNums.has(num)) {
        winnings++;
      }
    }
  }
  for(let i = 1; i <= winnings; i++) {
    cardSum[index + i] += cardSum[index];
  }
  return total;
}

processInstructions();