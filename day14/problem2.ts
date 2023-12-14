import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");

  const rocks = []
  for (const line of splitInput) {
    rocks.push(line.split(""));
  }
  // I visually looked for a period and it turns out that 1000 = 1,000,000,000 in the cycle
  for(let i = 0; i < 1000; i++) {
    moveNorth(rocks);
    moveWest(rocks);
    moveSouth(rocks);
    moveEast(rocks);
  }

  let total = 0;
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

function moveNorth(rocks: string[][]) {
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
}

function moveWest(rocks: string[][]) {
  for(let i = 0; i < rocks[0].length; i++) {
    for(let j = 0; j < rocks.length; j++) {
      if(rocks[j][i] === "O") {
        for(let k = 1; i - k > -1 && rocks[j][i-k] !== "O" && rocks[j][i-k] !== "#"; k++) {
          rocks[j][i-k] = "O";
          rocks[j][i - k + 1] = ".";
        }
      }
    }
  }
}

function moveSouth(rocks: string[][]) {
  for(let i = rocks.length-1; i > -1; i--) {
    for(let j = rocks[0].length - 1; j > -1; j--) {
      if(rocks[i][j] === "O") {
        for(let k = 1; i + k < rocks.length && rocks[i+k][j] !== "O" && rocks[i+k][j] !== "#"; k++) {
          rocks[i + k][j] = "O";
          rocks[i + k - 1][j] = ".";
        }
      }
    }
  }
}

function moveEast(rocks: string[][]) {
  for(let i = rocks[0].length-1; i > -1; i--) {
    for(let j = 0; j < rocks.length; j++) {
      if(rocks[j][i] === "O") {
        for(let k = 1; i + k < rocks[0].length && rocks[j][i+k] !== "O" && rocks[j][i+k] !== "#"; k++) {
          rocks[j][i+k] = "O";
          rocks[j][i + k - 1] = ".";
        }
      }
    }
  }
}

function printRocks(rocks: string[][]) {
  let rockString = ""
  for(let i = 0; i < rocks.length; i++) {
    for( let j = 0; j < rocks[0].length; j++) {
      rockString += rocks[i][j];
    }
    rockString += "\n"
  }
  console.log(rockString);
}