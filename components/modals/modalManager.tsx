"use client";

import { useModalStore } from "@/store/useModalStore";
import { GenericModal } from "./genericModal";
import { HistoryGamesTable } from "../tables/historyGamesTable";
import { NotificationList } from "../lists/notificationList";

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
          {view == "NOTIFICATIONS" && (
            <GenericModal onClose={closeModal} title={"Notifications"}>
              <NotificationList notifications={[]} />
            </GenericModal>
          )}
    </>
  );
};
