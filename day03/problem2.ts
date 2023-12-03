import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  let row = 0;
  for (const line of splitInput) {
    for(let i = 0; i < line.length; i++) {
      if(line.charAt(i) === "*") {
        total += addGear(row, i, splitInput);
      }
    }
    row++;
  }
  console.log(total);
}

function addGear(row: number, col: number, input: string[]): number {
  const nums: number[] = [];

  let leftChar = input[row].charAt(col - 1);
  if(isNum(leftChar)) {
    for(let i = col - 1; i > -2; i--) {
      const currChar = input[row].charAt(i);
      if(!isNum(currChar)) {
        nums.push(parseNum(row, i + 1, input));
        break;
      }
    }
  }

  let rightChar = input[row].charAt(col + 1);
  if(isNum(rightChar)) {
    nums.push(parseNum(row, col + 1, input));
  }

  if(input[row - 1]) {
    if(isNum(input[row - 1].charAt(col - 1))) {
      for(let i = col - 1; i > -2; i--) {
        const currChar = input[row - 1].charAt(i);
        if(!isNum(currChar)) {
          nums.push(parseNum(row - 1, i + 1, input));
          break;
        }
      }
      const testChar = input[row - 1].charAt(col);
      if(!isNum(testChar)) {
        if(isNum(input[row - 1].charAt(col + 1))) {
          nums.push(parseNum(row - 1, col + 1, input));
        }
      }
    } else {
      if(isNum(input[row - 1].charAt(col))) {
        nums.push(parseNum(row - 1, col, input));
      } else {
        if(isNum(input[row - 1].charAt(col + 1))) {
          nums.push(parseNum(row - 1, col + 1, input));
        }
      }
    }
  }

  if(input[row + 1]) {
    if(isNum(input[row + 1].charAt(col - 1))) {
      for(let i = col - 1; i > -2; i--) {
        const currChar = input[row + 1].charAt(i);
        if(!isNum(currChar)) {
          nums.push(parseNum(row + 1, i + 1, input));
          break;
        }
      }
      const testChar = input[row + 1].charAt(col);
      if(!isNum(testChar)) {
        if(isNum(input[row + 1].charAt(col + 1))) {
          nums.push(parseNum(row + 1, col + 1, input));
        }
      }
    } else {
      if(isNum(input[row + 1].charAt(col))) {
        nums.push(parseNum(row + 1, col, input));
      } else {
        if(isNum(input[row + 1].charAt(col + 1))) {
          nums.push(parseNum(row + 1, col + 1, input));
        }
      }
    }
  }

  if(nums.length !== 2) {
    return 0;
  }
  return nums[0] * nums[1];
}

function parseNum(row: number, col: number, input: string[]): number {
  let parseNum = 0;
  let char = Number.parseInt(input[row].charAt(col));
  for(let i = col; Number.isInteger(char); char = Number.parseInt(input[row].charAt(i))) {
    parseNum = (parseNum * 10) + char;
    i++;
  }
  return parseNum;
}

function isNum(str: any): boolean {
  return Number.isInteger(Number.parseInt(str));
}

processInstructions();