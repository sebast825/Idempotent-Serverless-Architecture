"use client";
import { FormattedAttempt } from "@/lib/game/types";
import { Card, Badge } from "react-bootstrap";
import { ChallengeUi } from "./challengeUi";

interface propsChallengeGhost {
  attempts: FormattedAttempt[];
  puzzleId: string;
  challengeId: string;
}

export const ChallengeGhost = ({ attempts, puzzleId ,challengeId}: propsChallengeGhost) => {
  return (
    <ChallengeUi puzzleId={puzzleId} challengeId={challengeId}>
      <Card.Text className="lead text-secondary mb-4">
        Your friend cracked this code in{" "}
        <Badge bg="success" className="p-2 px-3">
          {attempts.length} attempts
        </Badge>
        <br />
        <strong>Can you do it in {attempts.length - 1}?</strong> ⚔️
      </Card.Text>
    </ChallengeUi>
  );
};
