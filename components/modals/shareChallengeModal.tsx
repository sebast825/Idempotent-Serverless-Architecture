import useToastit from "@/hooks/useToastit";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSharePuzzle } from "../tables/useSharePuzzle";

export interface PropsShareChallengeModal {
  gameId: string;
  onClose: () => void;
}

export default function ShareChallengeModal(props: PropsShareChallengeModal) {
  const { gameId, onClose } = props;
  const { handleSharePuzzle, isPending } = useSharePuzzle();
  const { success } = useToastit();

  const [isGhost, setIsGhost] = useState(true);
  const [showFirstMove, setShowFirstMove] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleGenerateChallenge = async () => {
    const text: string = await handleSharePuzzle(gameId,isGhost,showFirstMove);
    setGeneratedLink(text);
    navigator.clipboard.writeText(text);
    success("Copied to clipboard!");
  };
  return (
    <div
      className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
    >
      <div className="p-4 p-md-5 m-2 rounded-xl shadow-2xl text-center bg-light border rounded-3">
        <h2 className="text-primary fw-bold">Challenge a Friend! 🏆</h2>

        <hr className="my-4 opacity-25" />

        {!generatedLink ? (
          <>
            <div className="text-start mb-4">
              <h6 className="fw-bold mb-3 text-dark">Challenge Options:</h6>

              {/* Opción 1: Ghost Mode */}
              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  id="ghostMode"
                  checked={isGhost}
                  onChange={(e) => setIsGhost(e.target.checked)}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="ghostMode"
                >
                  <strong>Ghost Mode:</strong> Play against my recording.
                </label>
              </div>

              {/* Opción 2: Mostrar primer intento */}
              <div className="form-check form-switch">
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  id="showFirstMove"
                  checked={showFirstMove}
                  onChange={(e) => setShowFirstMove(e.target.checked)}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="showFirstMove"
                >
                  <strong>Hint:</strong> Reveal my first move to the challenger.
                </label>
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              <Button
                variant="primary"
                className="w-100 py-2 fw-bold"
                onClick={() => handleGenerateChallenge()}
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Generate Challenge Link 🔗"}
              </Button>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column gap-2">
            <h5 className="fw-bold mb-3 text-success">Link Ready! 🚀</h5>
            <Button
              variant="primary"
              className="w-100 py-2 fw-bold"
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
                success("Copied to clipboard!");
              }}
            >
              Copy 🔗
            </Button>
          </div>
        )}
        <div className="my-2">
          <Button
            variant="outline-secondary"
            className="w-100 border-0 py-2 fw-bold"
            onClick={onClose}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
