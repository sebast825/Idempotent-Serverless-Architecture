"use client";
import { FormattedAttempt } from "@/lib/game/types";
import { Card, Badge } from "react-bootstrap";
import { ChallengeUi } from "./challengeUi";

interface ChallengeWithHistoryProps {
  attempts: FormattedAttempt[];
  puzzleId: string;
  challengeId: string;
}

export const ChallengeWithHistory = ({
  attempts,
  puzzleId,
  challengeId,
}: ChallengeWithHistoryProps) => {
  return (
    <ChallengeUi puzzleId={puzzleId} challengeId={challengeId}>
      <Card.Text className="lead text-secondary mb-4">
        Your friend cracked this code in{" "}
        <Badge bg="success" className="p-2 px-3">
          {attempts.length} attempts
        </Badge>
        <br />
        <span className="mt-2 d-inline-block">
          {attempts.length === 1 ? (
            <strong>
              A perfect score! Can you match this 1-attempt miracle? 😱
            </strong>
          ) : (
            <strong>
              Can you beat them and do it in {attempts.length - 1}? ⚔️
            </strong>
          )}
        </span>
      </Card.Text>
    </ChallengeUi>
  );
};
