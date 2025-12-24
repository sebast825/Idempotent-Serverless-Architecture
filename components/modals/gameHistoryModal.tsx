import { HistoryGamesTable } from "../tables/historyGamesTable";

export function GameHistoryModal({ onClose }: { onClose: () => void }) {
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
      <div className=" p-4  p-md-5 rounded-xl shadow-2xl text-center bg-light border rounded-2">
        <div
          className=" overflow-y-auto mb-6 custom-scrollbar"
          style={{ maxHeight: "70vh" }}
        >
          <HistoryGamesTable />
        </div>
      </div>
    </div>
  );
}
