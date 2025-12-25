import { MASTERMIND_COLORS, MastermindColor } from "@/lib/game/types";
import { Button } from "react-bootstrap";
import ColorCircle from "./colorCircle";

interface propsColorPicker {
  handleSelect: (e: MastermindColor) => void;
  currentGuess: (MastermindColor | null)[];
  submit: () => void;
  disableBtn: boolean;
}
export default function ColorPicker(props: propsColorPicker) {
  const { handleSelect, currentGuess, submit, disableBtn } = props;
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center w-100 gap-0 bg-dark p-2 py-4 bottom">
        {" "}
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-light">
          Select Color
        </h4>
        <div className="flex gap-2 rounded-2xl shadow-xl ">
          {MASTERMIND_COLORS.map((color, index) => (
            <>
              <ColorCircle
                key={index}
                color={color.toString()}
                btnAction={() => handleSelect(color)}
                isDisabled={currentGuess.indexOf(null) === -1}
                cursor={"pointer"}
                fullOpacity={false}
              ></ColorCircle>
            </>
          ))}
        </div>
        <Button className="mt-2" onClick={submit} disabled={disableBtn}>
          Validate
        </Button>
      </div>
    </>
  );
}
