"use client";
import { FEEDBACK_TO_EMOJI } from "@/lib/game/types";
import React from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";

const ChallengeLanding = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} xl={6}>
          <Card className="shadow-lg border-0 text-center p-4 p-md-5">
            <Card.Body>

              <Card.Title className="display-6 fw-bold mb-3">
                <div className=" text-warning" style={{ fontSize: "3rem" }}>
                  <h2>🏆🏆🏆</h2>
                </div>
                Mastermind Challenge
              </Card.Title>

              <Card.Text className="lead text-secondary mb-4">
                Your friend cracked this code in{" "}
                <Badge bg="success" className="p-2 px-3">
                  5 attempts
                </Badge>
                <br />
                <strong>Can you do it in 4?</strong> ⚔️
              </Card.Text>


              <div className="d-grid gap-3 ">
                <Button
                  variant="primary"
                  size="lg"
                  className="py-3 fw-bold shadow-sm"
                >
                  ACCEPT CHALLENGE
                </Button>

                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="border-0"
                >
                  I'm scared, just let me play a normal game
                </Button>
              </div>
              <hr className="my-4 opacity-25" />

              <div className="mt-4 d-flex justify-content-center gap-4 text-muted small">
                <div className="">
                  <p>Guess the secret code in 12 attempts!</p>
                  <ul className="text-start">
                    <li>{FEEDBACK_TO_EMOJI.MATCH} Correct color & position</li>
                    <li>
                      {FEEDBACK_TO_EMOJI.COLOR_ONLY} Correct color, wrong
                      position
                    </li>
                 
                  </ul>

                </div>

              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChallengeLanding;
