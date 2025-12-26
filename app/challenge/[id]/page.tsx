"use server";

import { findExistingGame } from "@/app/actions/gameActions";
import { ChallengeUi } from "./challengeUi";
import { NotFound } from "@/app/404/page";

const ChallengePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  try {
    const game = await findExistingGame(id);

    if (!game) return <NotFound message="Game not found" />;

    return <ChallengeUi gameId={game.id} attempts={game.attempts} />;
  } catch (error) {
    return (
      <NotFound
        title="Server Error"
        message="Something went wrong on our side."
      />
    );
  }
};

export default ChallengePage;
