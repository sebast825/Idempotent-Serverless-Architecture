import { MASTERMIND_COLORS, MastermindColor } from "@/lib/game/types";
import { Button } from "react-bootstrap";

interface propsColorPicker {
  handleSelect: (e: MastermindColor) => void;
  currentGuess: (MastermindColor | null)[];
  submit: () => void;
}
export default function ColorPicker(props: propsColorPicker) {
  const { handleSelect, currentGuess, submit } = props;
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center w-100 gap-0 bg-dark p-2 py-4">
        {" "}
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-light">
          Select Color
        </h4>
        <div className="flex gap-2 rounded-2xl shadow-xl ">
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
        <Button className="mt-2" onClick={submit}>
          Validate
        </Button>
      </div>
    </>
  );
}
