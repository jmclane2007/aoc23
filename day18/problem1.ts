import * as fs from 'fs';

const TRENCH_CHAR = "#";
interface Point {
  row: number,
  col: number
}

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  // Left and upmost are negative distances, right and downmost are max positive from the input
  const leftMost = 169, rightMost = 335;
  const upMost = 150, downMost = 74;
  // const leftMost = 0, rightMost = 6;
  // const upMost = 0, downMost = 9;
  const digPlan: string[][] = [];
  for(let i = 0; i < upMost + downMost + 1; i++) {
    const row = [];
    for(let j = 0; j < leftMost + rightMost + 1; j++) {
      row.push(".");
    }
    digPlan.push(row);
  }
  let row = upMost, col = leftMost;
  digPlan[row][col] = TRENCH_CHAR;
  for (const line of splitInput) {
    const direction = line.split(/[\s()]+/);
    const dir = direction[0];
    const num = Number.parseInt(direction[1])
    if(dir === "R") {
      for(let i = 1; i <= num; i++) {
        digPlan[row][col+i] = TRENCH_CHAR;
      }
      col += num;
    } else if(dir === "L") {
      for(let i = 1; i <= num; i++) {
        digPlan[row][col-i] = TRENCH_CHAR;
      }
      col -= num;
    } else if(dir === "U") {
      for(let i = 1; i <= num; i++) {
        digPlan[row-i][col] = TRENCH_CHAR;
      }
      row -= num;
    } else {
      for(let i = 1; i <= num; i++) {
        digPlan[row+i][col] = TRENCH_CHAR;
      }
      row += num;
    }
  }
  dfsFill(upMost + 1, leftMost + 1, digPlan);

  let output = "";
  let count = 0;
  for(let i = 0; i < upMost + downMost + 1; i++) {
    for(let j = 0; j < leftMost + rightMost + 1; j++) {
      output += digPlan[i][j];
      if(digPlan[i][j] === TRENCH_CHAR) {
        count++
      }
    }
    output += "\n";
  }
  // outputting the grid because it's fun
  console.log(output);
  console.log(count);
}

function dfsFill(startRow: number, startCol: number, digPlan: string[][]) {
  const stack: Point[] = [];
  stack.push({row: startRow, col: startCol});
  while(stack.length > 0) {
    const point = stack.pop();
    const row = point!.row;
    const col = point!.col;
    if(row < 0 || col < 0 || row > digPlan.length || col > digPlan[0].length || digPlan[row][col] === TRENCH_CHAR) {
      continue;
    }
    digPlan[row][col] = TRENCH_CHAR;
    stack.push({row: row+1, col});
    stack.push({row: row-1, col});
    stack.push({row, col: col+1});
    stack.push({row, col: col-1});
  }
}

processInstructions();