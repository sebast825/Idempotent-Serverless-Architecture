"use client";
import { engineeringDecisions } from "@/constants/engineeringDecisions";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

export const EngineeringDecisionsSection = () => {
  return (
    <Container>
      <div
        className="text-dark text-center py-5 px-3 m-md-5 rounded-3 shadow-lg border border-secondary border-opacity-25 bg-primary bg-opacity-75"
      
      >
        <div className="py-4">
          <h1
            className="text-uppercase fw-black mb-0"
            style={{ letterSpacing: "4px", fontSize: "2.5rem" }}
          >
            Mastermind
          </h1>

          <div className="d-flex justify-content-center mt-2 mb-4">
            <Badge
              bg="transparent"
              className="border border-dark text-dark px-3 py-2 bg-opacity-10"
              style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
            >
              SERVERLESS BACKEND · CASE STUDY
            </Badge>
          </div>

          <div
            className="mt-4 p-4 rounded-3 mx-auto  bg-dark"
            style={{
              maxWidth: "800px",
            }}
          >
            <h3
              className="fw-bold mb-3 text-info"
              style={{ fontSize: "1.25rem" }}
            >Engineering Decisions</h3>
            <p
              className="mx-auto text-secondary"
              style={{ maxWidth: 650, lineHeight: "1.6", fontSize: "1.05rem" }}
            >
              The value of this project lies not in the game itself, but in the{" "}
              <span className="text-white">
                design of its underlying system
              </span>
              : consistent, defensive, and built to operate under a{" "}
              <span className="text-info opacity-75">zero-trust model{" "}</span>
              with untrusted clients.
            </p>
          </div>
        </div>
      </div>
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
