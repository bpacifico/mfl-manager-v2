import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuPageDash from "bars/MenuPageDash.js";

interface PageDashProps {}

const PageDash: React.FC<PageDashProps> = ({ initialValue }) => {
  return (
    <div id="PageDash" className="container">
      <MenuPageDash />
      <Outlet />
    </div>
  );
};

export default PageDash;