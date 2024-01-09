import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuPageMercato from "bars/MenuPageMercato.js";
import BoxScrollUp from "components/box/BoxScrollUp.js";

interface PageMercatoProps {
  yScrollPosition: number;
}

const PageMercato: React.FC<PageMercatoProps> = ({ yScrollPosition }) => {
  return (
    <div id="PageMercato">
      {yScrollPosition > 100
        && <BoxScrollUp />
      }

      <MenuPageMercato />
      <Outlet />
    </div>
  );
};

export default PageMercato;