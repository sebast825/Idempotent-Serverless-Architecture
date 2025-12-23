import { GameStatus, MastermindColor } from "@/lib/game/types";
import { Button } from "react-bootstrap";
import GuessRow from "./guessRow";

export interface propsGameResultModal {
  code: (MastermindColor | null)[];
  btnPrimary: () => void;
  btnSecondary: () => void;
  status: GameStatus;
}

export default function GameResultModal(props: propsGameResultModal) {
  const { code, btnPrimary, btnSecondary, status } = props;
  return (
    <>
      <div className="fixed-top w-100 h-100 d-flex align-items-center  justify-content-center bg-dark bg-opacity-50">
        <div className=" p-5 rounded-xl shadow-2xl text-center bg-light border rounded-2">
          {status === "WON" ? (
            <h2 className="text-success">Victory! 🏆</h2>
          ) : (
            <h2 className="text-danger">Game Over 💀</h2>
          )}
          <p>The secret code is:</p>
          <GuessRow currentGuess={code} handleRemoveColor={() => {}} />
          <div className="d-flex gap-3 p-2">
            <Button className="w-100" onClick={() => btnPrimary()}>
              Play Again
            </Button>
            <Button variant="secondary w-100" onClick={() => btnSecondary()}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
