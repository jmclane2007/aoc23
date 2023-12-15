import * as fs from 'fs';

interface Lens {
  label: string;
  focalLength: number;
}
function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split(",");
  const boxes = new Map<number, Lens[]>();
  for (const code of splitInput) {
    let current = 0;
    // Apparently it's either a minus or an (equals and a single digit)
    let labelEnd = code.length - 1;
    let isDash = true;
    if(!code.endsWith("-")) {
      labelEnd--;
      isDash = false;
    }
    for(let i = 0; i < labelEnd; i++) {
      current = (((current + code.charCodeAt(i)) * 17) % 256);
    }
    const label = code.slice(0, labelEnd);
    if(isDash) {
      const temp = boxes.get(current);
      if(temp) {
        const removeIndex = temp.findIndex((lens: Lens) => lens.label === label);
        if(removeIndex !== -1) {
          temp.splice(removeIndex, 1);
        }
      }
    }
    else {
      if(!boxes.has(current)) {
        boxes.set(current, [{label, focalLength: code.charCodeAt(code.length - 1) - 48}])
      } else {
        const temp = boxes.get(current);
        if(temp) {
          const swapIndex = temp.findIndex((lens: Lens) => lens.label === label);
          if(swapIndex !== -1) {
            temp[swapIndex] = {label, focalLength: code.charCodeAt(code.length - 1) - 48}
          } else {
            temp.push({label, focalLength: code.charCodeAt(code.length - 1) - 48})
          }
        }
      }
    }
  }
  let total = 0;
  for(const boxValue of boxes.keys()) {
    const box = boxes.get(boxValue);
    for(let i = 0; i < box!.length; i++) {
      total += (boxValue + 1) * (i + 1) * box![i].focalLength;
    }
  }
  console.log(total);
}


processInstructions();