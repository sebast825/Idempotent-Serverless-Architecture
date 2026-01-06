
import ColorSequenceRow from "../game/colorSequenceRow";
import { useColorSelection } from "../game/useColorSelection";
import ColorPicker from "../game/colorPicker";
import { useCreateCustomChallenge } from "./useCreateCustomChallenge";
import { MastermindColor } from "@/lib/game/types";

export const CreateCustomChallenge = () => {
  const { handleRemoveColor, handleSelectColor, currentGuess } =
    useColorSelection();
  const { handleSharePuzzle,isProcessing } = useCreateCustomChallenge();
  const hadnleSubmit = () => {
    if (currentGuess.indexOf(null) === -1) {
      handleSharePuzzle(currentGuess as unknown as MastermindColor[]);
    }
  };
  return (
    <div className=" m-1 mx-md-5 my-md-3 ">
      <div className=" rounded-3 p-3 mb-2  bg-dark  w-100">
        <h4 className="text-center text-light"> Your Secret Code</h4>
        <div className="">
          <ColorSequenceRow
            currentGuess={currentGuess}
            handleRemoveColor={(e) => handleRemoveColor(e)}
          />
        </div>
      </div>
      <div className="bg-black rounded-3">
        <ColorPicker
          handleSelect={(e) => handleSelectColor(e)}
          currentGuess={currentGuess}
          submit={() => hadnleSubmit()}
          disableBtn={currentGuess.indexOf(null) !== -1 || isProcessing}
          btnText={isProcessing ? "Creating... ":"Create Challenge"}
        ></ColorPicker>
      </div>
    </div>
  );
};
