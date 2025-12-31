"use client";
import { engineeringDecisions } from "@/constants/engineeringDecisions";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

export const EngineeringDecisionsSection = () => {
  return (
   
      <Container >
        <div className="text-white text-center py-1 py-md-3 m-md-5 bg-primary border rounded-3 bgColorGradient">
          <div className="py-5 ">
           
            <h1 className="text-uppercase">Mastermind</h1>
             <Badge bg="danger" className="mb-3 px-3 py-2  bg-opacity-75">
              SERVERLESS BACKEND · CASE STUDY
            </Badge>
         <div className="mt-3 bg-info bg-opacity-50 p-4 rounded-3 text-dark" style={{ width: "fit-content", margin: "0 auto" }}>
            <h3 className="fw-bold mb-1">Engineering Decisions</h3>
            <p className="mx-auto" style={{ maxWidth: 720 }}>
              The value of this project lies not in the game itself, but in the
              design of its underlying system: consistent, defensive, and built
              to operate under a zero-trust model with untrusted clients.
            </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <Row className="g-4 justify-content-center">
            {engineeringDecisions &&
              engineeringDecisions.map((elem, index) => (
                <Col md={5} key={index}>
                  <Card className="h-100 shadow-lg border-0">
                    <Card.Body>
                      <h5 className="text-dark fw-bold mb-2">{elem.title}</h5>
                      <p className="text-muted small mb-0">
                        {elem.description}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
          <Row className="px-5 mx-5 py-5 gap-3 bg-info rounded-3">
            <h3 className="text-dark fw-bold mb-2">Execution Model & Client Boundaries</h3>
            <div>
              The system is designed around a strictly server-authoritative
              execution model. The client is treated as an untrusted actor whose
              sole responsibility is to express user intent and render
              server-provided state.
            </div>
            <div>
              All domain validation, authorization checks, state transitions,
              and persistence occur exclusively on the server. The database acts
              as the single source of truth, ensuring deterministic behavior
              regardless of client behavior, retries, or concurrency.
           </div>
            <div>
              Each request follows a well-defined lifecycle. The client submits
              an intent, never a direct state mutation. The server validates
              ownership, current domain state, and applicable business rules.
              All changes are applied transactionally and return a stable,
              idempotent response.
          </div>
            <div>
              The client is explicitly prevented from modifying game or
              challenge state directly, bypassing domain or authorization rules,
              accessing sensitive data outside authorized roles or states, or
              forcing duplicate executions through retries or double
              submissions.
         </div>
            <div>
              This model enforces clear execution boundaries, eliminates trust
              assumptions on the frontend, and guarantees consistency,
              correctness, and safety under concurrent and unreliable
              conditions.
            </div>{" "}
          </Row>
          
        </div>
        <div className="text-center mt-5">
          <p className="text-muted small">
            Core Stack: Next.js Server Actions · Prisma + PostgreSQL · Supabase
            · Zustand
          </p>
          <p className="text-muted small mb-0">
            This project prioritizes correctness, consistency, and server-side
            guarantees over visual complexity.
          </p>
        </div>
      </Container>

  );
};
