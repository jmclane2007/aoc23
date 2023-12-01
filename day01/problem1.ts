import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  for (const line of splitInput) {
    for(let i = 0; i < line.length; i++) {
      const digit = line.charCodeAt(i);
      if(digit >= 48 && digit <= 57) {
        total += ((digit - 48) * 10)
        break;
      }
    }
    for(let i = line.length - 1; i > -1; i--) {
      const digit = line.charCodeAt(i);
      if(digit >= 48 && digit <= 57) {
        total += (digit - 48)
        break;
      }
    }
  }
  console.log(total);
}

processInstructions();