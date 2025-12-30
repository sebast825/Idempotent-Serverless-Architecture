import ColorSequenceRow from "./game/colorSequenceRow";
import { useColorSelection } from "./game/useColorSelection";
import ColorPicker from "./game/colorPicker";

export const CreateCustomChallenge = () => {
  const { handleRemoveColor, handleSelectColor, currentGuess } =
    useColorSelection();
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
          submit={() => {}}
          disableBtn={currentGuess.indexOf(null) !== -1}
          btnText="Create Challenge"
        ></ColorPicker>
      </div>
    </div>
  );
};
