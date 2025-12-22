import { MASTERMIND_COLORS, MastermindColor } from "@/lib/game/types";

interface propsColorPicker {
  handleSelect: (e: MastermindColor) => void;
  currentGuess: (MastermindColor | null)[];
}
export default function ColorPicker(props: propsColorPicker) {
  const { handleSelect, currentGuess } = props;
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center w-100  bg-dark p-4">
        {" "}
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-light">
          Select Color
        </h4>
        <div className="flex gap-5 p-4rounded-2xl shadow-xl ">
          {MASTERMIND_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleSelect(color)}
              disabled={currentGuess.indexOf(null) === -1}
              className="m-2 rounded-circle shadow-sm"
              style={{
                backgroundColor: color.toLowerCase(),
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
      </div>
    </>
  );
}
