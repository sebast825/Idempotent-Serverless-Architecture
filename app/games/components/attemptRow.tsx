import { FeedbackStatus, MastermindColor } from "@/lib/game/types";
import { FeedbackIcons } from "./feedbackIcons";
import ColorCircle from "../../../components/game/colorCircle";

interface propsAttemptRow {
  attemptGuess: MastermindColor[];
  results: FeedbackStatus[];
}

export default function AttemptRow({ props }: { props: propsAttemptRow }) {
  const { attemptGuess, results } = props;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center w-100 border-bottom bg-dark rounded-4 m-1 border-light border-opacity-50  p-1 bg-slate-800 rounded-xl shadow-inner">
        {attemptGuess.map((color, index) => (
          <ColorCircle
            key={index}
            color={color.toString()}        
            cursor={"pointer"}
          ></ColorCircle>
        ))}
        <FeedbackIcons results={results} />
      </div>
    </>
  );
}
