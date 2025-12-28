import { Row, Col, Container, Spinner } from "react-bootstrap";
import { ProgressCard } from "./progressCard";
import { StatCard } from "./statsCard";
import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "@/app/actions/userStatsAction";

export const StatsGrid = () => {
  const { data:stats } = useQuery({
    queryKey: ["userstats"],
    queryFn: () => getUserStats(),
  });


  return (
    <>
      {stats == undefined ? (
        <div className="w-100 justify-content-center d-flex p-5">
          <Spinner></Spinner>
        </div>
      ) : (
        <Container className="py-2">
          <Row className="g-4 d-flex justify-content-around">
            <ProgressCard
              title={"Games"}
              leftValue={stats.gamesLost}
              rightValue={stats.gamesWon}
              totalValue={stats.totalGames}
            ></ProgressCard>

            <Col md={5}>
              <StatCard
                value={stats.winRate}
                label={"Current Streak"}
              ></StatCard>
            </Col>
            <Col md={5}>
              <StatCard
                value={stats.averageWonAttempts}
                label={"Avg. Attempts to Win"}
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
      )}{" "}
    </>
  );
};
