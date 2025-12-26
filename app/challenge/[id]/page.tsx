"use server";

import { findExistingGame } from "@/app/actions/gameActions";
import { NotFound } from "@/app/404/page";
import { ChallengeUi } from "./challengeUi";

const PuzzlePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  try {
    const game = await findExistingGame(id);

    if (!game) return <NotFound message="Game not found" />;

    return <ChallengeUi  puzzleId={game.puzzleId} attempts={game.attempts} />;
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
