import { FeedbackStatus, MastermindColor } from "@/lib/game/types";
import { FeedbackIcons } from "./feedbackIcons";

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
          <button
            key={index}
            className={`m-2 rounded-circle shadow-sm
            ${
              color
                ? "scale-100 shadow-lg"
                : "scale-90 opacity-50 border-dashed"
            }
          `}
            style={{
              backgroundColor: color?.toLowerCase() || "transparent",
              width: "40px",
              height: "40px",
              display: "inline-block",
              cursor: "pointer",
              border: "2px solid #666",
            }}
            aria-label={`Select ${color}`}
          ></button>
        ))}
        <FeedbackIcons results={results} />
      </div>
    </>
  );
}
