import { ChallengeConfig } from "./types";

export function createGhostPayload(
  originalGameId: string,
  isVisible: boolean = true
): ChallengeConfig {
  return {
    originalGameId,
    isGhostVisible: isVisible,
  };
}