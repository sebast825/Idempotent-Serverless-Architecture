"use client";
import { Container, Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  message?: string;
  title?: string;
}

export const NotFound = ({ 
  message = "The challenge you are looking for does not exist or has expired.", 
  title = "Challenge Not Found" 
}: NotFoundProps) => {
  const router = useRouter();

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="text-center p-5 shadow-sm border-0">
        <Card.Body>
          <div className="display-1 text-muted mb-4">🔍</div>
          <h2 className="fw-bold mb-3">{title}</h2>
          <p className="text-secondary mb-4">{message}</p>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};