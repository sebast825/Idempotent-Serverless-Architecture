"use client";
import { FeedbackDisplay } from "@/components/cards/feedbackDisplay";

interface NotFoundProps {
  message?: string;
  title?: string;
}

export const NotFound = ({
  message = "The puzzle you are looking for does not exist or has expired.",
  title = "Puzzle Not Found",
}: NotFoundProps) => {
  return <FeedbackDisplay title={title} message={message} />;
};
