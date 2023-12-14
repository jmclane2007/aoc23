import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  const rocks = []
  for (const line of splitInput) {
    rocks.push(line.split(""));
  }
  // move rocks north
  for(let i = 0; i < rocks.length; i++) {
    for(let j = 0; j < rocks[0].length; j++) {
      if(rocks[i][j] === "O") {
        for(let k = 1; i - k > -1 && rocks[i-k][j] !== "O" && rocks[i-k][j] !== "#"; k++) {
          rocks[i - k][j] = "O";
          rocks[i - k + 1][j] = ".";
        }
      }
    }
  }

  for(let i = 0; i < rocks.length; i++) {
    for( let j = 0; j < rocks[0].length; j++) {
      if(rocks[i][j] === "O") {
        total += (rocks.length - i)
      }
    }
  }
  console.log(total);
}


processInstructions();