import { findExistingGame } from "@/app/actions/gameActions";

import { ChallengeWithHistory } from "../components/challengeWithHistory";
import {
  ChallengeWithConfig,
  getChallenge,
} from "@/app/actions/challengeActions";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { ChallengeUi } from "../components/challengeUi";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const PuzzlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const challenge: ChallengeWithConfig = await getChallenge(id);
    if (!challenge) {
      redirect(ROUTES.not_found())
    }
    if(challenge.type == "CUSTOM"){
      return <ChallengeUi  puzzleId={challenge.puzzleId} challengeId={challenge.id}></ChallengeUi>
 
    }
    let game;
    if (challenge.challengerGameId) {
      game = await findExistingGame(challenge.challengerGameId);
    } else {
      redirect(ROUTES.not_found());
    }

    if (!game) redirect(ROUTES.not_found());

    return (
      <ChallengeWithHistory
        attempts={game.attempts}
        puzzleId={game.puzzleId}
        challengeId={challenge.id}
      />
    );
  } catch (error) {
    //when use redirect next throws an error, this ensure the redirect works
    if (isRedirectError(error)) {
      throw error;
    }
    redirect(ROUTES.not_found());
  }
};

export default PuzzlePage;
