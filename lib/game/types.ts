import { Attempt, Prisma } from "@prisma/client";

export const MASTERMIND_COLORS = [
  "RED",
  "BLUE",
  "GREEN",
  "YELLOW",
  "PURPLE",
  "ORANGE",
] as const;
export const COLOR_TO_EMOJI: Record<MastermindColor, string> = {
  RED: "🟥",
  BLUE: "🟦",
  GREEN: "🟩",
  YELLOW: "🟨",
  PURPLE: "🟪",
  ORANGE: "🟧",
};

export const FEEDBACK_TO_EMOJI: Record<FeedbackStatus, string> = {
  MATCH: "🟢",
  COLOR_ONLY: "🟡",
  NONE: "⚪",
};
export type MastermindColor = (typeof MASTERMIND_COLORS)[number];

export type FeedbackStatus = "MATCH" | "COLOR_ONLY" | "NONE";

export type GameStatus = "PLAYING" | "WON" | "LOST";

export interface responsePosition {
  position: number;
  val1: string | number;
  val2: string | number;
  matchPosition: boolean;
  matchDifferentPosition: null | boolean;
}

// Primero definimos el Intento formateado para no repetirlo
export interface FormattedAttempt {
  id: string;
  gameId: string;
  submissionId: string;
  guess: MastermindColor[];
  result: FeedbackStatus[];
  createdAt: Date;
}

export type GameWithAttempts = Omit<
  Prisma.GameGetPayload<{ include: { attempts: true } }>,
  "attempts"
> & {
  attempts: FormattedAttempt[];
};

export type GameWithAttemptsAndPuzzle = GameWithAttempts & {
  puzzle: Prisma.PuzzleGetPayload<true>;
    challenge: Prisma.ChallengeGetPayload<true>;

};

export type GameWithRelations = Prisma.GameGetPayload<{
  include: {
    attempts: true;
    puzzle: true;
    challenge: true;
  };
}>;

export interface AttemptResponse {
  feedback: FeedbackStatus[];
  gameStatus: GameStatus;
  secretCode?: MastermindColor[];
}



export interface GhostAttemptResponse extends AttemptResponse{
  ghostAttempt? : FormattedAttempt
}
export interface GameWithGhost extends GameWithAttempts{
  ghostAttempts? : FormattedAttempt[]
}