"use client";
import { useCreatePuzzleAndGame } from "@/hooks/game/useCreatePuzzleAndGame";
import { useModalStore } from "@/store/useModalStore";
import { Container, Stack, Button } from "react-bootstrap";

export const HeroActions = () => {
  const { createPuzzleAndGame, isPending } = useCreatePuzzleAndGame();
  const openModal = useModalStore((state) => state.openModal);
  return (
    <Container className="text-center mt-4">
      <Stack
        direction="vertical"
        gap={3}
        className="justify-content-center  p-3 flex-sm-row m-auto"
        style={{ maxWidth: "600px" }}
      >
        <Button
          variant="primary"
          className="w-100 w-sm-auto"
          size="lg"
          onClick={async () => await createPuzzleAndGame()}
          disabled={isPending}
        >
          Play Demo
        </Button>

        <Button
          variant="outline-secondary"
          className="w-100 w-sm-auto"
          size="lg"
          onClick={() => openModal("GAME_RULES")}
        >
          How It Works
        </Button>
      </Stack>
    </Container>
  );
};
