"use client";

import { useModalStore } from "@/store/useModalStore";
import { GenericModal } from "./genericModal";
import { HistoryGamesTable } from "../tables/historyGamesTable";

export const ModalManager = () => {
  const { isOpen, closeModal, view } = useModalStore();
  if (!isOpen) return;
  return (
    <>
      {view == "HISTORYGAMES" && (
        <GenericModal onClose={closeModal} title={"Games History"}>
          <HistoryGamesTable />
        </GenericModal>
      )}
    </>
  );
};
