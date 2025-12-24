import { Prisma } from "@prisma/client";

export const MASTERMIND_COLORS = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'] as const;

export type MastermindColor = typeof MASTERMIND_COLORS[number];

export type FeedbackStatus = 'MATCH' | 'COLOR_ONLY' | 'NONE';

export type GameStatus = 'PLAYING' | 'WON' | 'LOST';

export interface responsePosition {
  position: number;
  val1: string | number;
  val2: string | number;
  matchPosition: boolean;
  matchDifferentPosition: null | boolean;
}

export type GameWithAttempts = Omit<
  Prisma.GameGetPayload<{
    include: { attempts: true };
  }>,
  "attempts"
> & {
  attempts: {
    id: string;
    gameId: string;
    submissionId: string;
    guess: MastermindColor[];
    results: FeedbackStatus[];
    createdAt: Date;
  }[];
};

export interface AttemptResponse {
  feedback: FeedbackStatus[];
  gameStatus: GameStatus;
  secretCode?: MastermindColor[];
}