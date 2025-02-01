import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </>
  );
};

export default DashboardLayout;
