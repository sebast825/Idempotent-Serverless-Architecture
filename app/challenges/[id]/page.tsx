import { findExistingGame } from "@/app/actions/gameActions";
import { NotFound } from "@/app/404/page";

import { ChallengeGhost } from "../components/challengeGhost";
import {
  ChallengeWithConfig,
  getChallenge,
} from "@/app/actions/challengeActions";

const PuzzlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const challenge: ChallengeWithConfig = await getChallenge(id);
    if (!challenge) {
      console.log("")
      return <NotFound message="Challenge not found" />;
    }
    let game;
    if (challenge.challengerGameId) {
      game = await findExistingGame(challenge.challengerGameId);
    } else {
      return <NotFound message="Original game not found" />;
    }

    if (!game) return <NotFound message="Game not found" />;

    return <ChallengeGhost attempts={game.attempts} puzzleId={game.puzzleId} challengeId={challenge.id} />;
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
