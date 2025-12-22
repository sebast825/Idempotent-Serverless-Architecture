export const MASTERMIND_COLORS = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'] as const;

export type MastermindColor = typeof MASTERMIND_COLORS[number];
