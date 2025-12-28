import { Row, Col, Card, ProgressBar } from "react-bootstrap";

interface propsProgressCard {
  title: string;
  leftLabel?: string;
  rightLabel?: string;
  leftValue: number;
  rightValue: number;
  totalValue: number;
}
export const ProgressCard = (props: propsProgressCard) => {
  const {
    title,
    leftLabel = "Loses",
    rightLabel = "Wins",
    leftValue,
    rightValue,
    totalValue,
  } = props;
  return (
    <Col xs={12}>
      <Card className="border-0 shadow-sm bg-dark text-white p-4">
        <div className="d-flex align-items-center gap-2 mb-2">
          {/* <Swords size={24} className="text-danger" /> */}
          <h4 className="mb-0">{title}</h4>
        </div>

        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex justify-content-between mb-2 fw-bold">
              <span className="text-success small">
                {rightLabel}: {rightValue}
              </span>
              <span className="text-danger small">
                {leftLabel}: {leftValue}
              </span>
            </div>
            <ProgressBar style={{ height: "20px" }} className="bg-secondary">
              <ProgressBar
                variant="success"
                now={(rightValue / totalValue) * 100}
                animated
              />
              <ProgressBar
                variant="danger"
                now={(leftValue / totalValue) * 100}
              />
            </ProgressBar>
          </Col>
          <Col md={4} className="text-center mt-3 mt-md-0">
            <div className="h2 mb-0 fw-bold">
              {Math.round((rightValue / totalValue) * 100)}%
              <span className="h6"> Win Rate</span>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
