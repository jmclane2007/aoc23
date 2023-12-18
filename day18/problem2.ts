import * as fs from 'fs';

interface Point {
  row: number,
  col: number
}

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");

  let row = 0, col = 0;
  const points = [];
  let outsideSteps = 0;
  for (const line of splitInput) {
    const direction = line.split(/[\s()#]+/);
    const dir = direction[2].charAt(direction[2].length-1);
    const hex = direction[2].substring(0, direction[2].length-1);
    const num = Number.parseInt(hex, 16);
    if(dir === "0") {
      col += num;
    } else if(dir === "2") {
      col -= num;
    } else if(dir === "3") {
      row -= num;
    } else {
      row += num;
    }
    outsideSteps += num;
    points.push({row, col});
  }

  let area = 0;
  for(let i = 0; i < points.length - 1; i++) {
    area += ((points[i].col * points[i+1].row) - (points[i].row * points[i+1].col));
  }
  area = Math.abs(area/2);
  console.log(outsideSteps + (area + 1 - outsideSteps / 2));
}

processInstructions();