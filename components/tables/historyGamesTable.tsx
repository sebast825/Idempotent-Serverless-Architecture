import { Button, Spinner, Table } from "react-bootstrap";
import { usePagination } from "../../hooks/usePagination";
import PaginationBtns from "../paginationBtns";
import { getPaginatedGamesByUser } from "@/app/actions/historyActions";
import { useQuery } from "@tanstack/react-query";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { useSharePuzzle } from "./useSharePuzzle";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";

export function HistoryGamesTable() {
  const router = useRouter();
  const { page, pageSize, goToPage } = usePagination();
  const closeModal = useModalStore((state) => state.closeModal);
  const { handleSharePuzzle } = useSharePuzzle();

  //use to disable share btns while processing
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { data: historyGames, isLoading } = useQuery({
    queryKey: ["gameHistory", page],
    queryFn: () => getPaginatedGamesByUser(page, pageSize),
  });

  function handleContinueGame(gameId: string) {
    router.push(ROUTES.game(gameId));

    closeModal();
  }
  function handleShowRepetition(gameId: string) {
    router.push(ROUTES.reviewGame(gameId));
    closeModal();
  }

  const onShareClick = async (gameId: string) => {
    setProcessingId(gameId);
    await handleSharePuzzle(gameId);
    setProcessingId(null);
  };
  if (historyGames?.data.length == 0) {
    return (
      <div className="w-100 text-center p-5">
        <p>No games aviable</p>
      </div>
    );
  }
  return (
    <>
      <div style={{ minHeight: "50px" }}>
        {isLoading ? (
          <div className="w-100 text-center p-5">
            <Spinner></Spinner>
          </div>
        ) : (
          <>
            <div
              className=" overflow-y-auto mb-6 custom-scrollbar"
              style={{ overflowX: "auto", width: "100%", maxHeight: "50vh" }}
            >
              <Table striped bordered hover style={{ overflowX: "auto" }}>
                <thead>
                  <tr className="text-center">
                    <th>Id</th>
                    <th>Status</th>
                    <th>Options</th>

                    <th>Completed At</th>
                  </tr>
                </thead>
                <tbody>
                  {historyGames?.data?.map((game, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        <td>{index}</td>
                        <td>{game.status}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            {game.status === "PLAYING" ? (
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleContinueGame(game.id)}
                              >
                                Continue
                              </Button>
                            ) : (
                              <>
                                <Button
                                  onClick={() => handleShowRepetition(game.id)}
                                  variant="outline-success"
                                  size="sm"
                                >
                                  Watch
                                </Button>
                                <button
                                  className="btn btn-sm btn-outline-info"
                                  onClick={() => onShareClick(game.id)}
                                  disabled={processingId == game.id}
                                >
                                  Challenge
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          {game.completedAt
                            ? game.completedAt.toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

          {historyGames?.totalPages &&   <PaginationBtns
              page={page}
              totalPages={historyGames?.totalPages}
              goToPage={goToPage}
            />}
          </>
        )}
      </div>
    </>
  );
}
