"use client";

import { Opening } from "@/components/opening";
import { useCreatePuzzleAndGame } from "@/hooks/game/useCreatePuzzleAndGame";
import { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { DashboardActions } from "./comonents/dashboardActions";

export default function Dashboard() {
  const { createPuzzleAndGame, isPending } = useCreatePuzzleAndGame();
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <>
      <div className="margin-top px-2">
        <Opening />
        <DashboardActions></DashboardActions>
      </div>
    </>
  );
}
