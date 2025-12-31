"use client";

import { Opening } from "@/components/opening";

import { DashboardActions } from "./comonents/dashboardActions";
import { Footer } from "@/components/footer";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  return (
    <>
      <div className=" d-flex flex-column  min-vh-100">
        <div className="margin-top flex-grow-1   justify-content-center align-content-center bg-dark ">
          <Container className="my-3">
            <Opening />
            <DashboardActions />
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
