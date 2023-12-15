import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split(",");
  let total = 0;
  for (const code of splitInput) {
    let current = 0;
    for(let i = 0; i < code.length; i++) {
      current = (((current + code.charCodeAt(i)) * 17) % 256);
    }
    total += current;
  }
  console.log(total);
}


processInstructions();