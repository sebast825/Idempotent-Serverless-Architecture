"use client";

import { Opening } from "@/components/opening";

import { DashboardActions } from "./comonents/dashboardActions";
import { Footer } from "@/components/footer";

export default function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column  min-vh-100">
        <div className="flex-grow-1 margin-top px-2 px-md-5  ">
          <Opening />
          <DashboardActions />
        </div>
        <Footer />
      </div>
    </>
  );
}
