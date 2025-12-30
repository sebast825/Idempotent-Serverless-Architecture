import { FeatureCard } from "@/components/cards/featureCard";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const DashboardActions = () => {
  return (
    <div className="py-3 py-md-3 m-md-5 rounded-3 my-4 bg-primary">
      <Row className="g-4 justify-content-center p-3 p-md-5">
        {/* CARD 1: QUICK PLAY */}
        <FeatureCard
          color={"#3b82f6"}
          svgChildren={<polygon points="5 3 19 12 5 21 5 3"></polygon>}
          btnVariant={"outline-primary"}
          btnText={"PLAY NOW"}
          text="Quick Play"
          description="Jump straight into the action and crack the secret code."
        />

        {/* CARD 2: CUSTOM CHALLENGE */}
        <FeatureCard
          color={"#14d494ff"}
          svgChildren={
            <>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </>
          }
          btnVariant={"outline-success"}
          btnText={"CREATE CHALLENGE"}
          text="Custom Challenge"
          description="Create a secret code and generate a link for your friends."
        />

        {/* CARD 3: PERFORMANCE */}
        <FeatureCard
          color={"#f59e0b"}
          svgChildren={
            <>
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </>
          }
          btnVariant={"outline-warning"}
          btnText={"VIEW STATISTICS"}
          text="Performance"
          description="Analyze your accuracy and effectiveness by color."
        />
      </Row>
    </div>
  );
};
