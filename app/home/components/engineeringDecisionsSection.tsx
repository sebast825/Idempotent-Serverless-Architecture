"use client";
import { engineeringDecisions } from "@/constants/engineeringDecisions";
import { Container, Row, Col, Card } from "react-bootstrap";

export const EngineeringDecisionsSection = () => {
  return (
    <Container>
    
      <div className="d-flex flex-column gap-4 mt-3">
        <Row className="g-4 justify-content-center">
          {engineeringDecisions &&
            engineeringDecisions.map((elem, index) => (
              <Col md={5} key={index}>
                <Card className="h-100 shadow-lg border-0">
                  <Card.Body>
                    <h5 className="text-dark fw-bold mb-2">{elem.title}</h5>
                    <p className="text-muted small mb-0">{elem.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Row className="px-3 px-md-5 mx-0 mx-md-5 py-5 gap-3 bg-info bg-opacity-75 rounded-3 text-dark">
          <h3 className="text-dark fw-bold mb-2">
            Execution Model & Client Boundaries
          </h3>
          <div>
            The system is designed around a strictly server-authoritative
            execution model. The client is treated as an untrusted actor whose
            sole responsibility is to express user intent and render
            server-provided state.
          </div>
          <div>
            All domain validation, authorization checks, state transitions, and
            persistence occur exclusively on the server. The database acts as
            the single source of truth, ensuring deterministic behavior
            regardless of client behavior, retries, or concurrency.
          </div>
          <div>
            Each request follows a well-defined lifecycle. The client submits an
            intent, never a direct state mutation. The server validates
            ownership, current domain state, and applicable business rules. All
            changes are applied transactionally and return a stable, idempotent
            response.
          </div>
          <div>
            The client is explicitly prevented from modifying game or challenge
            state directly, bypassing domain or authorization rules, accessing
            sensitive data outside authorized roles or states, or forcing
            duplicate executions through retries or double submissions.
          </div>
          <div>
            This model enforces clear execution boundaries, eliminates trust
            assumptions on the frontend, and guarantees consistency,
            correctness, and safety under concurrent and unreliable conditions.
          </div>
        </Row>
      </div>
      <div className="text-center mt-5">
        <p className="text-muted small">
          Core Stack: Next.js Server Actions · Prisma + PostgreSQL · Supabase ·
          Zustand
        </p>
        <p className="text-muted small mb-0">
          This project prioritizes correctness, consistency, and server-side
          guarantees over visual complexity.
        </p>
      </div>
    </Container>
  );
};
