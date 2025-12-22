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

