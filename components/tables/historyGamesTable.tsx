import { Table } from "react-bootstrap";
import { usePagination } from "../../hooks/usePagination";
import PaginationBtns from "../paginationBtns";
import { getPaginatedGamesByUser } from "@/app/actions/historyActions";
import { useQuery } from "@tanstack/react-query";

export function HistoryGamesTable() {
  const { page, pageSize, goToPage } = usePagination();

  const { data: historyGames } = useQuery({
    queryKey: ["gameHistory", page],
    queryFn: () => getPaginatedGamesByUser(page, pageSize),
  });
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
                  <td>options</td>
                  <td>
                    {game.completedAt
                      ? game.completedAt.getDate.toString()
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
