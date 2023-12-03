import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  let row = 0;
  let totalString = ""
  for (const line of splitInput) {
    let partNum = 0;
    let isValidNumber = false;
    for(let i = 0; i < line.length; i++) {
      const char = Number.parseInt(line.charAt(i));
      if(Number.isInteger(char)) {
        isValidNumber = isValidNumber || checkAdjacent(row, i, splitInput);
        partNum = (partNum * 10) + char;
      }
      if(Number.isNaN(char) || i === line.length - 1) {
        if(isValidNumber) {
          totalString += "  " + partNum;
          total += partNum;
        }
        partNum = 0;
        isValidNumber = false;
      }
    }
    totalString += "\n";
    row++;
  }
  console.log(totalString)
  console.log(total);
}

function checkAdjacent(row: number, col: number, input: string[]): boolean {
  for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++) {
      if(input[row + i] && input[row + i].charAt(col + j)) {
        const char = input[row + i].charAt(col + j);
        if(char !== "." && Number.isNaN(Number.parseInt(char))) {
          return true;
        }
      }
    }
  }
  return false;
}

processInstructions();