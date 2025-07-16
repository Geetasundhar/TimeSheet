import React from "react";
import { Outlet } from "react-router-dom";
import CEOSidebar from "./components/CEOSidebar"; // adjust if needed

const CEOLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <CEOSidebar />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f9faff" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default CEOLayout;
