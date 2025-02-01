import React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import DashboardData from "../components/DashboardLayout/DashboardData";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardData />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
