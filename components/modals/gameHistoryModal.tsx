import { getPaginatedGamesByUser } from "@/app/actions/historyActions";
import { usePagination } from "@/hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PaginationBtns from "../paginationBtns";

export function GameHistoryModal({ onClose }: { onClose: () => void }) {
  const { page, pageSize, goToPage } = usePagination();

  const { data } = useQuery({
    queryKey: ["gameHistory", page],
    queryFn: () => getPaginatedGamesByUser(page, pageSize),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="fixed-top w-100 h-100 d-flex align-items-center  justify-content-center bg-dark bg">
      <button
        onClick={onClose}
        className="btn d-flex align-items-center justify-content-center border border-2 border-white rounded-circle bg-dark text-white p-0"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "45px",
          height: "45px",
          zIndex: 1060,
          fontSize: "1.2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
        }}
      >
        ✕
      </button>
      <div
        className=" p-4  p-md-5 rounded-xl shadow-2xl text-center bg-light border rounded-2"
        onClick={onClose}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Game History</h2>
        </div>
        <div>
          <h2>Here goes the table</h2>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <PaginationBtns
            page={page}
            totalPages={3}
            goToPage={goToPage}
          ></PaginationBtns>
        </div>
      </div>
    </div>
  );
}
