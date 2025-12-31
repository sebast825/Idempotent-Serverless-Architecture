"use client";

import { Opening } from "@/components/opening";

import { DashboardActions } from "./comonents/dashboardActions";
import { Footer } from "@/components/footer";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column  min-vh-100">
        <div className="flex-grow-1 margin-top  ">
          <Container>
            <Opening />
            <DashboardActions />
          </Container>{" "}
        </div>
        <Footer />
      </div>
    </>
  );
}
