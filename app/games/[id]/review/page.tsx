import { getGameForReview } from "@/app/actions/gameActions";
import { GameWithGhostAndPuzzle } from "@/lib/game/types";
import ReviewGame from "./reviewUi";
import { FeedbackDisplay } from "@/components/cards/feedbackDisplay";
import { createClient } from "@/lib/supabase/server";
export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const game: GameWithGhostAndPuzzle = await getGameForReview(id);
    const {user} = await createClient();
    return <ReviewGame game={game} currentUserId={user?.id}></ReviewGame>;
  } catch {
    return <FeedbackDisplay title="The game is been played!"></FeedbackDisplay>;
  }
}
