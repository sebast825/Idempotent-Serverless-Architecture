import { findExistingGame } from "@/app/actions/gameActions";
import { NotFound } from "@/app/404/page";

import { ChallengeGhost } from "../components/challengeGhost";
import {
  ChallengeWithConfig,
  getChallengeByIdAction,
} from "@/app/actions/challengeActions";

const PuzzlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const challenge: ChallengeWithConfig = await getChallengeByIdAction(id);
    if (!challenge) {
      return <NotFound message="Challenge not found" />;
    }
    let game;
    if (challenge.config.originalGameId) {
      game = await findExistingGame(challenge.config.originalGameId);
    } else {
      return <NotFound message="Original game not found" />;
    }

    if (!game) return <NotFound message="Game not found" />;

    return <ChallengeGhost attempts={game.attempts} puzzleId={game.puzzleId} />;
  } catch (error) {
    console.error("Error loading puzzle page:", error);
    return (
      <NotFound
        title="Server Error"
        message="Something went wrong on our side."
      />
    );
  }
};

export default PuzzlePage;
