import * as fs from 'fs';

const numberMap: Map<string, number> = new Map([
  ["zero", 0],
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9]]
);

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let total = 0;
  const englishNums = Array.from(numberMap.keys());
  for (const line of splitInput) {
    let minIndex = line.length;
    let wordValue = 0;
    for(const num of englishNums) {
      const index = line.indexOf(num);
      if(index !== -1 && index < minIndex) {
        minIndex = index;
        wordValue = numberMap.get(num) || 0;
      }
    }
    for(let i = 0; i < line.length; i++) {
      const digit = line.charCodeAt(i);
      if(digit >= 48 && digit <= 57) {
        if(i < minIndex) {
          total += ((digit - 48) * 10)
        } else {
          total += (wordValue * 10);
        }
        break;
      }
    }

    let maxIndex = -1;
    wordValue = 0;
    for(const num of englishNums) {
      const index = line.lastIndexOf(num);
      if(index !== -1 && index > maxIndex) {
        maxIndex = index;
        wordValue = numberMap.get(num) || 0;
      }
    }
    for(let i = line.length - 1; i > -1; i--) {
      const digit = line.charCodeAt(i);
      if(digit >= 48 && digit <= 57) {
        if(i > maxIndex) {
          total += (digit - 48)
        } else {
          total += wordValue
        }
        break;
      }
    }
  }
  console.log(total);
}

processInstructions();