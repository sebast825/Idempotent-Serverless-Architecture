"use client";
import { FeedbackDisplay } from "@/components/cards/feedbackDisplay";

interface NotFoundProps {
  message?: string;
  title?: string;
}

export default function NotFound  ({
  message = "Something went wrong",
  title = "Not Found",
}: NotFoundProps)  {
  return <FeedbackDisplay title={title} message={message} />;
};
