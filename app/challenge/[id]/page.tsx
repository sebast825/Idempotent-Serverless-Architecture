
import { createGameAction, findExistingGame } from "@/app/actions/gameActions";
import { NotFound } from "@/app/404/page";
import { ChallengeUi } from "../components/challengeUi";
import { useMutation } from "@tanstack/react-query";

import useToastit from "@/hooks/useToastit";
import { useRouter } from "next/navigation";
import { Card, Badge } from "react-bootstrap";
import { ChallengeGhost } from "../components/challengeGhost";

const PuzzlePage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  try {
    const game = await findExistingGame(id);

    if (!game) return <NotFound message="Game not found" />;

    return (
   <ChallengeGhost attempts={game.attempts} puzzleId={game.puzzleId} />
    );
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
