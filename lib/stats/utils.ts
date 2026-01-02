import { Game } from "@prisma/client";
import { GameWithAttempts } from "../game/types";
import { UserStats } from "./types";


export const getStatsFromGames = (games:GameWithAttempts[]) : UserStats => {
   const sumary = games.reduce(
    (acc, game) => {
      if (game.challengeId != null) {
        if (game.status != "PLAYING") acc.totalChallenges++;
        if (game.status == "WON") acc.challengesWon++;
        if (game.status == "LOST") acc.challegesLost++;
      }
      if (game.status == "WON") {
        acc.gamesWon++;
        acc.attempts += game.attempts.length;
      }
      if (game.status == "LOST") acc.gamesLost++;

      if (game.status != "PLAYING") acc.totalGames++;
      return acc;
    },
    {
      challengesWon: 0,
      challegesLost: 0,
      gamesWon: 0,
      gamesLost: 0,
      attempts: 0,
      totalGames: 0,
      totalChallenges: 0,
    }
  );

  const statsResponse: UserStats = {
    winRate: getWinStreak(games),
    challengesWon: sumary.challengesWon,
    challegesLost: sumary.challegesLost,
    gamesWon: sumary.gamesWon,
    gamesLost: sumary.gamesLost,
    averageWonAttempts: Math.floor(sumary.attempts / sumary.gamesWon) || 0,
    totalGames: sumary.totalGames,
    totalChallenges: sumary.totalChallenges,
  };
  return statsResponse;
}
 const getWinStreak = (games: Game[]) => {
  let streak: number = 0;

  for (let i = games.length - 1; i >= 0; i--) {
    if (games[i].status == "WON") {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};




