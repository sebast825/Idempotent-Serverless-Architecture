import React from "react";
import { Col, Card, Button } from "react-bootstrap";

interface PropsFeatureCard {
  bgColor?: string;
  color: string;
  text: string;
  description: string;
  svgChildren: React.ReactNode;
  btnVariant: string;
  btnText: string;
  btnAction:()=>void
  btndisable?:boolean
}
export const FeatureCard = (props: PropsFeatureCard) => {
  const {
    bgColor = "#1e293b",
    color,
    svgChildren,
    btnVariant,
    btnText,
    text,
    description,
    btnAction,
    btndisable = false
  } = props;
  return (
    <>
      <Col md={6} xl={4}>
        <Card
          className="h-100 border-0 shadow-sm text-center p-3 bg-dark"
          style={{ background: `${bgColor}`, borderRadius: "24px" }}
        >
          <Card.Body className="d-flex flex-column align-items-center">
            <div
              className="mb-4 p-3 rounded-circle"
              style={{
                background: `color-mix(in srgb, ${color}, transparent 90%)`,
                color: `${color}`,
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {svgChildren}
              </svg>
            </div>
            <h4 className="fw-bold text-white ">{text}</h4>
            <p className="text-secondary small mb-4">{description}</p>
            <Button
              variant={btnVariant}
              className="w-100 mt-auto fw-bold py-2 text-uppercase"
              style={{ borderRadius: "12px" }}
              onClick={btnAction}
              disabled={btndisable}
            >
              {btnText}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
