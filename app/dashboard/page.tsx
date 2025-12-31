"use client";

import { Opening } from "@/components/opening";

import { DashboardActions } from "./comonents/dashboardActions";

export default function Dashboard() {
  return (
    <>


     <div className="margin-top px-2 px-md-5">
          <Opening />
          <DashboardActions></DashboardActions>
        </div>
   
    </>
  );
}
