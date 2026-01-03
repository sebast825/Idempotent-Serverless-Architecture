import { FeedbackStatus, MastermindColor } from "@/lib/game/types";
import { FeedbackIcons } from "./feedbackIcons";
import ColorCircle from "../../../components/game/colorCircle";

interface propsAttemptRow {
  attemptGuess: MastermindColor[];
  results: FeedbackStatus[];
  isGhostMode?: boolean;
}

export default function AttemptRow({ props }: { props: propsAttemptRow }) {
  const { attemptGuess, results, isGhostMode = false } = props;
  return (
    <>
      <div
        className={`d-flex m-1  ms-auto   align-items-center  border-bottom bg-dark ${
          isGhostMode && "bg-opacity-75 justify-content-end px-1"
        } ${
          !isGhostMode && " p-1 justify-content-center"
        }  rounded-4  border-light border-opacity-50 `}
        style={{ maxWidth: "max-content" }}
      >
        {isGhostMode && "👻"}
        {attemptGuess.map((color, index) => (
          <ColorCircle
            key={index}
            color={color.toString()}
            cursor={"pointer"}
            isGhostMode={isGhostMode}
          ></ColorCircle>
        ))}
        <FeedbackIcons results={results} />
      </div>
    </>
  );
}
