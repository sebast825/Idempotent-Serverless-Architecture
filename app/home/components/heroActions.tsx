"use client"
import { useCreatePuzzleAndGame } from "@/hooks/game/useCreatePuzzleAndGame";
import { useModalStore } from "@/store/useModalStore";
import { Container, Stack, Button } from "react-bootstrap"

export const HeroActions = () =>{
     const { createPuzzleAndGame, isPending } = useCreatePuzzleAndGame();
  const openModal = useModalStore((state) => state.openModal);
   return (
  <Container className="text-center mt-4">
          <Stack
            direction="horizontal"
            gap={3}
            className="justify-content-center flex-wrap p-3"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={async () => await createPuzzleAndGame()}
              disabled={isPending}
            >
              Play Demo
            </Button>

            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => openModal("GAME_RULES")}
            >
              How It Works
            </Button>
          </Stack>
        </Container>
   )
}