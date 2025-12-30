import { findExistingGame } from "@/app/actions/gameActions";

import { ChallengeGhost } from "../components/challengeGhost";
import {
  ChallengeWithConfig,
  getChallenge,
} from "@/app/actions/challengeActions";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";

const PuzzlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const challenge: ChallengeWithConfig = await getChallenge(id);
    if (!challenge) {
      redirect(ROUTES.not_found())
    }
    let game;
    if (challenge.challengerGameId) {
      game = await findExistingGame(challenge.challengerGameId);
    } else {
      redirect(ROUTES.not_found());
    }

    if (!game) redirect(ROUTES.not_found());

    return (
      <ChallengeGhost
        attempts={game.attempts}
        puzzleId={game.puzzleId}
        challengeId={challenge.id}
      />
    );
  } catch (error) {
    redirect(ROUTES.not_found());
  }
};

export default PuzzlePage;
