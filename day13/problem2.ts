import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n\r\n");
  let total = 0;
  for (const field of splitInput) {
    let fieldTotal = 0;
    const mirrors = field.split("\r\n");
    // check horizontal lines
    fieldTotal += smudgeCheck(mirrors, 100, mirrorCheck(mirrors, 100, 0));
    const transposed = transposeField(mirrors);
    fieldTotal += smudgeCheck(transposed, 1, mirrorCheck(transposed, 1, 0));
    console.log(fieldTotal);
    total += fieldTotal;
  }
  console.log(total);
}

function mirrorCheck(mirrors: string[], multiplier: number, original: number): number {
  let fieldTotal = 0;
  for(let i = 1; i < mirrors.length; i++) {
    if(mirrors[i] === mirrors[i-1]) {
      let isMirror = true;
      for(let j = 1; isMirror; j++) {
        if(i + j >= mirrors.length || i-1-j < 0) {
          break;
        }
        if(mirrors[i+j] !== mirrors[i-1-j]) {
          isMirror = false;
        }
      }
      if(isMirror && multiplier * i !== original) {
        return multiplier * i;
      }
    }
  }
  return fieldTotal;
}

function smudgeCheck(mirrors: string[], multiplier: number, original: number): number {
  // Change one character, redo the check
  for(let i = 0; i < mirrors.length; i++) {
    for(let j = 0; j < mirrors[0].length; j++) {
      const char = mirrors[i].charAt(j) === "#" ? "." : "#";
      const save = mirrors[i].slice();
      mirrors[i] = mirrors[i].slice(0,j) + char + mirrors[i].slice(j+1);
      const total = mirrorCheck(mirrors, multiplier, original);
      mirrors[i] = save;
      if(total > 0 && total !== original) {
        return total;
      }
    }
  }
  return 0;
}

function transposeField(field: string[]): string[] {
  const transposed: string[] = new Array(field[0].length);
  for(let i = 0; i < field[0].length; i++) {
    transposed[i] = ""
    for(let j = 0; j < field.length; j++) {
      transposed[i] += field[j].charAt(i);
    }
  }
  return transposed;
}

processInstructions();