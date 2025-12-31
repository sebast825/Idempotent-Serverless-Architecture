"use client";
import { engineeringDecisions } from "@/constants/engineeringDecisions";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

export const EngineeringDecisionsSection = () => {
  return (
    <Container className="">
      <div className="text-center mb-5">
        <Badge bg="dark" className="mb-3 px-3 py-2">
          SERVERLESS BACKEND · CASE STUDY
        </Badge>

        <h2 className="fw-bold mb-3">Engineering Decisions</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: 720 }}>
          The value of this project lies not in the game itself, but in the
          design of its underlying system: consistent, defensive, and built to
          operate under a zero-trust model with untrusted clients.
        </p>
      </div>
      <div className="d-flex flex-column gap-4">
        <Row className="g-4">
          {engineeringDecisions &&
            engineeringDecisions.map((elem, index) => (
              <Col md={6} key={index}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <h5 className="fw-bold mb-2">{elem.title}</h5>
                    <p className="text-muted small mb-0">{elem.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <h5 className="fw-bold mb-2">Request Lifecycle</h5>
                <ul className="text-muted small mb-0 ps-3">
                  <li>
                    The client submits intent, never a direct state change.
                  </li>
                  <li>The server validates ownership and current state.</li>
                  <li>Domain rules are applied deterministically.</li>
                  <li>Changes are persisted within an atomic transaction.</li>
                  <li>A stable and idempotent response is returned.</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <h5 className="fw-bold mb-2">What the Client Cannot Do</h5>
                <ul className="text-muted small mb-0 ps-3">
                  <li>Directly modify game or challenge states.</li>
                  <li>Bypass domain rules or authorization checks.</li>
                  <li>
                    Access sensitive data outside of explicitly authorized roles
                    or states.
                  </li>
                  <li>
                    Force duplicate executions through retries or double
                    submissions.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
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
