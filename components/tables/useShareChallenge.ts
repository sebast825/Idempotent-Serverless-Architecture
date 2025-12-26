import { findExistingGame } from "@/app/actions/gameActions";
import useToastit from "@/hooks/useToastit";
import { MAX_ATTEMPTS } from "@/lib/game/config";
import {
  COLOR_TO_EMOJI,
  FEEDBACK_TO_EMOJI,
  FormattedAttempt,
  GameWithAttempts,
} from "@/lib/game/types";
import { useMutation } from "@tanstack/react-query";

export const useShareChallenge = () => {
  const { success, error } = useToastit();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameId: string): Promise<GameWithAttempts> => {
      return findExistingGame(gameId);
    },
  });

  const generateText = (game: GameWithAttempts): string => {
    const text = `🏆 Mastermind Challenge! 🧠

${selectTextWinOrLose(game)}    

My opening move:
${formatColorAttempt(game.attempts[0])}

🔥 You have been challenged! 🔥

Accept the challenge here 👇
${window.location.origin}/challenge/${game.id}`.trim();
    return text;
  };
  const selectTextWinOrLose = (game: GameWithAttempts): string => {
    return game.status === "WON"
      ? `I cracked the code in ${game.attempts.length}/${MAX_ATTEMPTS} tries! ⚔️\nCan you beat my record?`
      : `I couldn't solve it in 12 attempts... 😅\nCan you beat this level?`;
  };

  const formatColorAttempt = (attempt: FormattedAttempt): string => {
    if (!attempt) return "No moves yet! 🆕";
    let coloredAttempt = attempt.guess
      .map((color) => convertColorToEmoji(color))
      .join("");
    let feedbackAttempt = attempt.results
      .map((feedback) => converFeedbackToEmoji(feedback))
      .join("");
    const text = `${coloredAttempt} ➔ ${feedbackAttempt} `;
    return text;
  };

  const convertColorToEmoji = (color: string): string => {
    return COLOR_TO_EMOJI[color as keyof typeof COLOR_TO_EMOJI];
  };
  const converFeedbackToEmoji = (feedback: string) => {
    return FEEDBACK_TO_EMOJI[feedback as keyof typeof FEEDBACK_TO_EMOJI];
  };
  const handleShareChallenge = async (gameId: string): Promise<void> => {
    try {
      const game: GameWithAttempts = await mutateAsync(gameId);
      const text: string = generateText(game);
      navigator.clipboard.writeText(text);
      success("Copied to clipboard!");
    } catch (err) {
      error("An error occurred while copying to clipboard");
    }
  };
  return { handleShareChallenge, isPending };
};
