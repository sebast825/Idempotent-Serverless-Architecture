import { UserStats } from "@/lib/stats/types";
import { Row, Col, Card, Container, ProgressBar } from "react-bootstrap";
import { ProgressCard } from "./progressCard";
import { StatCard } from "./statsCard";

export const StatsGrid = () => {
  const stats: UserStats = {
    winRate: 20,
    challengesWon: 10,
    challegesLost: 3,
    gamesWon: 41,
    gamesLost: 13,
    averageWonAttempts: 4,
    totalGames: 54,
    totalChallenges: 13,
  };
  return (
    <>
      <Container className="py-2">
        <Row className="g-4">
          <ProgressCard
            title={"Games"}
            leftValue={stats.gamesLost}
            rightValue={stats.gamesWon}
            totalValue={stats.totalGames}
          ></ProgressCard>
   
          <Col md={6}>
            <StatCard value={stats.winRate} label={"Victory Rate"}></StatCard>
          </Col>
          <Col md={6}>
            <StatCard
              value={stats.averageWonAttempts}
              label={"Average Won Attempts"}
            ></StatCard>
          </Col>
        
          <ProgressCard
            title={"Challenges"}
            leftValue={stats.challegesLost}
            rightValue={stats.challengesWon}
            totalValue={stats.totalChallenges}
          ></ProgressCard>
        </Row>
      </Container>
    </>
  );
};
