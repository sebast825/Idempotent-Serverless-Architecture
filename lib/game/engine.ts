import { MASTERMIND_COLORS, MastermindColor, responsePosition } from "./types";


export function generateSecretCode(): MastermindColor[] {
  // 1. Create an array of random indices using Crypto
  const randomValues = new Uint32Array(4);
  crypto.getRandomValues(randomValues);

  // 2. Map those values to your colors
  return Array.from(randomValues).map(
    (val) => MASTERMIND_COLORS[val % MASTERMIND_COLORS.length]
  );
}

export function validate(code : MastermindColor[], attempt: MastermindColor[]):responsePosition[] {
var matchPosition =  matchValueAndPosition(code,attempt);
return matchValueInOtherPositionWithouthMatch(matchPosition)
}

function matchValueAndPosition(code : MastermindColor[], attempt: MastermindColor[]):responsePosition[] {
  var rsta = attempt.map((elem, index) => {
    return createResponsePosition(
      index,
      elem,
      code[index],
      elem == code[index]
    );
  });
  console.log(rsta);
  return rsta;
}


function matchValueInOtherPositionWithouthMatch(response: responsePosition[]):responsePosition[] {

  const unmatched = response.filter((r) => !r.matchPosition);

  unmatched.forEach((elem, index) => {
    if (!elem.matchPosition) {
      unmatched.slice(index + 1).forEach((elem2) => {
        if (!elem2.matchPosition && elem2.val2 == elem.val1) {
          elem.matchDifferentPosition = true;
          elem2.matchDifferentPosition = true;
        }
      });
    }
  });
  const arra :any[]= []
  response.forEach(elem =>{
    if(elem.matchPosition){
    arra.push(elem.matchPosition)

    }
     if(elem.matchDifferentPosition){
          arra.push(elem.matchDifferentPosition)

    }
  })
  return response;
}
function createResponsePosition(
  position: number,
  val1: string | number,
  val2: string | number,
  matchPosition: boolean
): responsePosition {
  return {
    position,
    val1,
    val2,
    matchPosition,
    matchDifferentPosition: null,
  };
}