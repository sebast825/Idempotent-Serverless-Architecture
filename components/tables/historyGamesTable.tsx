import { Button, Table } from "react-bootstrap";
import { usePagination } from "../../hooks/usePagination";
import PaginationBtns from "../paginationBtns";
import { getPaginatedGamesByUser } from "@/app/actions/historyActions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";

export function HistoryGamesTable() {

  const router = useRouter();
  const { page, pageSize, goToPage } = usePagination();
  const closeModal = useModalStore((state) => state.closeModal);

  const { data: historyGames } = useQuery({
    queryKey: ["gameHistory", page],
    queryFn: () => getPaginatedGamesByUser(page, pageSize),
  });

  function handleContinueGame(gameId: string) {
   
    router.push(`/game/${gameId}`);
     closeModal();
  }

  return (
    <>
      <div className="w-100 ">
        <h2 className="mb-3 border-bottom">Games History</h2>
      </div>

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
                          <Link
                            href={`/game/${game.id}/review`}
                            className="btn btn-sm btn-outline-success"
                          >
                            Watch
                          </Link>
                          <button className="btn btn-sm btn-outline-info">
                            Share
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

      <PaginationBtns
        page={page}
        totalPages={historyGames?.totalPages!}
        goToPage={goToPage}
      />
    </>
  );
}
