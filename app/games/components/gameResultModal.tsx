import { GameStatus, MastermindColor } from "@/lib/game/types";
import { Button } from "react-bootstrap";
import ColorSequenceRow from "../../../components/game/colorSequenceRow";

export interface propsGameResultModal {
  code: (MastermindColor | null)[];
  btnPrimary: () => void;
  btnPrimaryDisable: boolean;
  btnSecondary: () => void;
  btnSecondaryDisable: boolean;
  onClose: () => void;
  status: GameStatus;
}

export default function GameResultModal(props: propsGameResultModal) {
  const {
    code,
    btnPrimary,
    onClose,
    status,
    btnPrimaryDisable,
    btnSecondary,
    btnSecondaryDisable,
  } = props;
  return (
    <>
      <div className="fixed-top w-100 h-100 d-flex align-items-center  justify-content-center bg-dark bg-opacity-50">
        <div className=" p-4  p-md-5 rounded-xl shadow-2xl text-center bg-light border rounded-2">
          {status === "WON" ? (
            <h2 className="text-success">Victory! 🏆</h2>
          ) : (
            <h2 className="text-danger">Game Over 💀</h2>
          )}
          <p>The secret code is:</p>
          <ColorSequenceRow currentGuess={code} handleRemoveColor={() => {}} />
          <div className="d-flex flex-column gap-2 py-2 ">
            <Button onClick={() => btnPrimary()} disabled={btnPrimaryDisable}>
              Play Again
            </Button>
            <Button
              className="w-100"
              variant="warning"
              onClick={() => btnSecondary()}
              disabled={btnSecondaryDisable}
            >
              Share as Challenge
            </Button>
            <Button
              variant="outline-secondary"
              className="border-0"
              onClick={() => onClose()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
