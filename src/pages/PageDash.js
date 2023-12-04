import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuPageDash from "bars/MenuPageDash.js";
import BoxScrollUp from "components/box/BoxScrollUp.js";

interface PageDashProps {
  yScrollPosition: number;
}

const PageDash: React.FC<PageDashProps> = ({ yScrollPosition }) => {
  return (
    <div id="PageDash">
      {yScrollPosition > 100
        && <BoxScrollUp />
      }

      <MenuPageDash />
      <Outlet />
    </div>
  );
};

export default PageDash;