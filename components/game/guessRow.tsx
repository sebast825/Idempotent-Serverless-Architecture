import { MastermindColor } from "@/lib/game/types";

interface propsGuessRow {
  currentGuess: (MastermindColor | null)[];
  handleRemoveColor: (e: number) => void;
}

export default function GuessRow(props: propsGuessRow) {
  const { currentGuess, handleRemoveColor } = props;
  return (
    <div className="d-flex align-items-center justify-content-center w-100  gap-4 p-1 bg-slate-800 rounded-xl shadow-inner">
      {currentGuess.map((color, index) => (
        <button
          key={index}
          onClick={() => handleRemoveColor(index)}
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
    </div>
  );
}
