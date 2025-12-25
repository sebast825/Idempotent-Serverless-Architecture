import { MastermindColor } from "@/lib/game/types";
import ColorCircle from "./colorCircle";

interface PropsGuessRow {
  currentGuess: (MastermindColor | null)[];
  handleRemoveColor: (e: number) => void;
  btnPointer?: boolean;
}

export default function GuessRow(props: PropsGuessRow) {
  const { currentGuess, handleRemoveColor, btnPointer = true } = props;
  return (
    <div className="d-flex justify-content-center p-1">
      <div className="bg-dark p-3 px-4 rounded-5 ">
        {currentGuess.map((color, index) => (
          <ColorCircle
            key={index + "asd"}
            color={color?.toString() || "transparent"}
            customClass={`${
              color
                ? "scale-100 shadow-lg"
                : "scale-90 opacity-50 border-dashed"
            }`}
            btnAction={() => handleRemoveColor(index)}
            isDisabled={!btnPointer}
            cursor={"pointer"}
          ></ColorCircle>
        ))}
      </div>
    </div>
  );
}
