import { MastermindColor } from "../game/types";

export interface ChallengeConfig {
  secret?: MastermindColor[];
  originalGameId?: string;
  isGhostVisible: boolean;
}