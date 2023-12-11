import exp from 'constants';
import * as fs from 'fs';

interface Galaxy {
  id: number;
  row: number;
  col: number;
}

function processInstructions() {
  const EXPAND_SIZE = 999999;
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  const expandedRows = [];

  for(let row = 0; row < splitInput.length; row++) {
    let emptyRow = true;
    for(let col = 0; col < splitInput[row].length; col++) {
      if(splitInput[row].charAt(col) === "#") {
        emptyRow = false;
      }
    }
    if(emptyRow) {
      expandedRows.push(row);
    }
  }

  const expandedCols = [];
  for(let col = 0; col < splitInput[0].length; col++) {
    let emptyCol = true;
    for(let row = 0; row < splitInput.length; row++) {
      if(splitInput[row].charAt(col) === "#") {
        emptyCol = false;
      }
    }
    if(emptyCol) {
      expandedCols.push(col);
    }
  }

  const galaxies: Galaxy[] = []
  for(let row = 0; row < splitInput.length; row++) {
    for(let col = 0; col < splitInput[row].length; col++) {
      if(splitInput[row].charAt(col) === "#") {
        galaxies.push({id: galaxies.length + 1, row, col});
      }
    }
  }
  
  let total = 0;
  for(let i = 0; i < galaxies.length; i++) {
    for(let j = i + 1; j < galaxies.length; j++) {
      // no abs needed on rows because of how we scan through the array
      total += (galaxies[j].row - galaxies[i].row) + Math.abs(galaxies[j].col - galaxies[i].col);
      for(const row of expandedRows) {
        if(row > galaxies[i].row && row < galaxies[j].row) {
          total += EXPAND_SIZE;
        }
      }
      for(const col of expandedCols) {
        if((col > galaxies[i].col && col < galaxies[j].col) || (col < galaxies[i].col && col > galaxies[j].col)) {
          total += EXPAND_SIZE;
        }
      }
    }
  }
  console.log(total);
}


processInstructions();