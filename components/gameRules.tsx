"use client";

import { MAX_ATTEMPTS } from "@/lib/game/config";
import { FEEDBACK_TO_EMOJI } from "@/lib/game/types";
import React from "react";
import { Card, Row, Col, ListGroup, Badge } from "react-bootstrap";

// Componente pequeño para reutilizar el estilo de las pistas
const ClueIcon = ({ symbol, text }: { symbol: string; text: string }) => (
  <div className="d-flex align-items-start mb-3">
    <span className="fs-3 me-3 leading-none">{symbol}</span>
    <span className="text-secondary">{text}</span>
  </div>
);

export const GameRules = () => {
  return (
    <Card className="shadow-lg border-0">
      <Card.Body className="p-4">
        {/* Objective */}
        <section className="mb-5">
          <h3 className="h5 fw-bold mb-3 text-primary">
            <Badge bg="primary" pill className="me-2">
              01
            </Badge>
            Objective
          </h3>
          <p className="text-muted ms-4 ps-2">
            Decode the secret 4-color sequence in the fewest attempts possible.
          </p>
          <div className="ms-4 text-center">
            <Badge bg="info" className="text-dark fw-normal p-2">
              Maximum attempts: <strong>{MAX_ATTEMPTS}</strong>
            </Badge>
          </div>
        </section>

        {/* How to Play */}
        <section className="mb-5">
          <h3 className="h5 fw-bold mb-3 text-primary">
            <Badge bg="primary" pill className="me-2">
              02
            </Badge>
            How to Play
          </h3>
          <ListGroup variant="flush" className="ms-4">
            <ListGroup.Item className="border-0 text-muted">
              1. Select <strong>4 colors</strong> to form your guess.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              2. Submit your combination to receive automatic clues.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              3. Use the clues to refine your next attempt.
            </ListGroup.Item>
          </ListGroup>
        </section>

        {/* Clue System */}
        <section className="mb-5 bg-light p-4 rounded-3">
          <h3 className="h5 fw-bold mb-4">Clue System</h3>
          <Row>
            <Col md={6}>
              <ClueIcon
                symbol={FEEDBACK_TO_EMOJI.MATCH}
                text="Correct color in the correct position (Exact match)."
              />
            </Col>
            <Col md={6}>
              <ClueIcon
                symbol={FEEDBACK_TO_EMOJI.COLOR_ONLY}
                text="Correct color but in the wrong position."
              />
            </Col>
          </Row>
          <div className="mt-2 ms-1 text-center ">
            <small className="text-dark  fw-bold">
              *Note: Clues are not ordered - they {"don't"} correspond to specific
              positions.*
            </small>
          </div>
        </section>

        {/* Example Round */}
        <section>
          <h3 className="h5 fw-bold mb-4 text-primary">
            <Badge bg="primary" pill className="me-2">
              03
            </Badge>
            Quick Example
          </h3>
          <div className="border rounded-3 p-3">
            <Row className="text-center g-3">
              <Col xs={6}>
                <p className="small text-uppercase fw-bold text-muted mb-2">
                  Secret Code
                </p>
                <div className="d-flex justify-content-center gap-2 fs-4">
                  🔴 🔵 🟢 🟡
                </div>
              </Col>
              <Col xs={6}>
                <p className="small text-uppercase fw-bold text-muted mb-2">
                  Your Guess
                </p>
                <div className="d-flex justify-content-center gap-2 fs-4">
                  🔴 🟢 🔵 🟠
                </div>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="text-center">
              <p className="small text-uppercase fw-bold text-muted mb-2">
                Resulting Clues
              </p>
              <div className="fs-3 mb-3">
                {FEEDBACK_TO_EMOJI.COLOR_ONLY} {FEEDBACK_TO_EMOJI.MATCH}{" "}
                {FEEDBACK_TO_EMOJI.COLOR_ONLY}
              </div>
              <div className="text-start mx-auto" style={{ maxWidth: "400px" }}>
                <p className="small mb-1">
                  <strong className="text-dark">
                    {FEEDBACK_TO_EMOJI.MATCH}
                  </strong>
                  : Red is perfect (position 1).
                </p>
                <p className="small mb-0">
                  <strong className="text-dark">
                    {FEEDBACK_TO_EMOJI.COLOR_ONLY}{" "}
                    {FEEDBACK_TO_EMOJI.COLOR_ONLY}
                  </strong>
                  : Green & Blue are correct colors but misplaced.
                </p>
              </div>
              <div className="mt-3 pt-2 border-top">
                <small className="text-muted">
                  Keep guessing until you crack the code or run out of attempts!
                </small>
              </div>
            </div>
          </div>
        </section>
      </Card.Body>

      <Card.Footer className="text-center py-3 bg-white border-top-0">
        <span className="text-muted fst-italic">Good luck, Mastermind!</span>
      </Card.Footer>
    </Card>
  );
};
