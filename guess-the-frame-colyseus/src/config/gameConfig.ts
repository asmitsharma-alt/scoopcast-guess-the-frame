export interface GameConfig {
  defaultRounds: number;
  defaultTimerDuration: number;
  revealDuration: number;
  autoAdvanceDuration: number;
  maxPlayers: number;
  scoring: {
    firstPlace: number;
    secondPlace: number;
    thirdPlace: number;
    hintCost: number;
  };
}

export const GAME_CONFIG: GameConfig = {
  defaultRounds: 20,
  defaultTimerDuration: 30, // 30 seconds default
  revealDuration: 5,
  autoAdvanceDuration: 20,  // 20s safety auto-advance after reveal
  maxPlayers: 16,
  scoring: {
    firstPlace: 10,
    secondPlace: 7,
    thirdPlace: 5,
    hintCost: 2             // Exact 2 points deduction
  }
};
