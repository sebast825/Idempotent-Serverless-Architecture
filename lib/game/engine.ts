import {
  FeedbackStatus,
  MASTERMIND_COLORS,
  MastermindColor,
  responsePosition,
} from "./types";

export function generateSecretCode(): MastermindColor[] {
  // 1. Create an array of random indices using Crypto
  const randomValues = new Uint32Array(4);
  crypto.getRandomValues(randomValues);

  // 2. Map those values to your colors
  return Array.from(randomValues).map(
    (val) => MASTERMIND_COLORS[val % MASTERMIND_COLORS.length]
  );
}

export function validate(
  code: MastermindColor[],
  attempt: MastermindColor[]
): FeedbackStatus[] {
  const matchPosition = matchValueAndPosition(code, attempt);
  const matchDifferentPosition =
    matchValueInOtherPositionWithouthMatch(matchPosition);

  return formatFeedback(matchDifferentPosition);
}

function formatFeedback(response: responsePosition[]): FeedbackStatus[] {
  const formatResponse: FeedbackStatus[] = response.map((elem) => {
    if (elem.matchPosition) {
      return "MATCH";
    }
    if (elem.matchDifferentPosition) {
      return "COLOR_ONLY";
    }
    return "NONE";
  });
  return formatResponse;
}
function matchValueAndPosition(
  code: MastermindColor[],
  attempt: MastermindColor[]
): responsePosition[] {
  const rsta = attempt.map((elem, index) => {
    return createResponsePosition(
      index,
      elem,
      code[index],
      elem == code[index]
    );
  });
  return rsta;
}


function matchValueInOtherPositionWithouthMatch(
  response: responsePosition[]
): responsePosition[] {
  // 1. Get colors from secret that didn't result in a MATCH
  const availableInSecret = response
    .filter((r) => !r.matchPosition)
    .map((r) => r.val2);

  // 2. Check elements that didn't MATCH position
  response.forEach((elem) => {
    if (!elem.matchPosition) {
      // Look for the color in the available pool
      const indexInPool = availableInSecret.indexOf(elem.val1);

      if (indexInPool !== -1) {
        elem.matchDifferentPosition = true;
        // 3. Remove used color from pool to avoid double counting
        availableInSecret.splice(indexInPool, 1);
      }
    }
  });

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

export function isVictory(code: FeedbackStatus[]): boolean {
  const isVictory: boolean = code.every((e) => e == "MATCH");
  return isVictory;
}
