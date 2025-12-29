"use client"

import { useRouter } from "next/navigation";
import { Container, Card, Button } from "react-bootstrap";
interface propsFeedbackDisplay {
  message?: string;
  title?: string;
}

export const FeedbackDisplay = ({
  message = "Try later!",
  title = "Not Found",
}: propsFeedbackDisplay) => {
  const router = useRouter();

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="text-center p-5 shadow-sm border-0">
        <Card.Body>
          <div className="display-1 text-muted mb-4">🔍</div>
          <h2 className="fw-bold mb-3">{title}</h2>
          <p className="text-secondary mb-4">{message}</p>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={() => router.push("/dashboard")}>
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
