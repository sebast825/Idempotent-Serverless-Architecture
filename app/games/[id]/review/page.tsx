import { getGameForReview } from "@/app/actions/gameActions";
import { GameWithAttemptsAndPuzzle } from "@/lib/game/types";
import ReviewGame from "./reviewUi";
import { FeedbackDisplay } from "@/components/cards/feedbackDisplay";
export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const game: GameWithAttemptsAndPuzzle = await getGameForReview(id);
    return <ReviewGame game={game}></ReviewGame>;
  } catch (err: any) {
    return <FeedbackDisplay title="The game is been played!"></FeedbackDisplay>;
  }
}
