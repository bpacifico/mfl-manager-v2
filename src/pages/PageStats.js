import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuPageStats from "bars/MenuPageStats.js";

interface PageStatsProps {}

const PageStats: React.FC<PageStatsProps> = ({ initialValue }) => {
  return (
    <div id="PageStats" className="container">
      <MenuPageStats />
      <Outlet />
    </div>
  );
};

export default PageStats;