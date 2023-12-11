import * as fs from 'fs';

interface Galaxy {
  row: number;
  col: number;
}

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  const expanded = [];

  for(let row = 0; row < splitInput.length; row++) {
    let emptyRow = true;
    for(let col = 0; col < splitInput[row].length; col++) {
      if(splitInput[row].charAt(col) === "#") {
        emptyRow = false;
      }
    }
    expanded.push(splitInput[row].slice());
    if(emptyRow) {
      expanded.push(splitInput[row].slice());
    }
  }

  for(let col = 0; col < expanded[0].length; col++) {
    let emptyCol = true;
    for(let row = 0; row < expanded.length; row++) {
      if(expanded[row].charAt(col) === "#") {
        emptyCol = false;
      }
    }
    if(emptyCol) {
      for(let row = 0; row < expanded.length; row++) {
        expanded[row] = expanded[row].slice(0, col) + "." + expanded[row].slice(col);
      }
      col++;
    }
  }

  const galaxies: Galaxy[] = []
  for(let row = 0; row < expanded.length; row++) {
    for(let col = 0; col < expanded[row].length; col++) {
      if(expanded[row].charAt(col) === "#") {
        galaxies.push({row, col});
      }
    }
  }
  
  let total = 0;
  for(let i = 0; i < galaxies.length; i++) {
    for(let j = i + 1; j < galaxies.length; j++) {
      // no abs needed on rows because of how we scan through the array
      total += (galaxies[j].row - galaxies[i].row) + Math.abs(galaxies[j].col - galaxies[i].col);
    }
  }
  console.log(total);
}


processInstructions();