import { MASTERMIND_COLORS, MastermindColor } from "./types";


export function generateSecretCode(): MastermindColor[] {
  // 1. Create an array of random indices using Crypto
  const randomValues = new Uint32Array(4);
  crypto.getRandomValues(randomValues);

  // 2. Map those values to your colors
  return Array.from(randomValues).map(
    (val) => MASTERMIND_COLORS[val % MASTERMIND_COLORS.length]
  );
}
