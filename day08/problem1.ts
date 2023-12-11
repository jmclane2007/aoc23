import * as fs from 'fs';

interface Node {
  left: string;
  right: string;
}

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  const steps = splitInput[0];
  const directionsMap = new Map<string, Node>();
  for(let i = 2; i < splitInput.length; i++) {
    const node = splitInput[i].split(/[\s=(,)]+/);
    directionsMap.set(node[0], {left: node[1], right: node[2]})
  }
  let currNode = "AAA";
  for(let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    const step = steps.charAt(i % steps.length);
    if(step === "L") {
      currNode = directionsMap.get(currNode)!.left;
    } else {
      currNode = directionsMap.get(currNode)!.right;
    }
    if(currNode === "ZZZ") {
      console.log(i + 1);
      break;
    }
  }
}


processInstructions();