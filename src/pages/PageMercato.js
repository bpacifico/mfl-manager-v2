import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuPageMercato from "bars/MenuPageMercato.js";

interface PageMercatoProps {}

const PageMercato: React.FC<PageMercatoProps> = ({ initialValue }) => {
  return (
    <div id="PageMercato" className="container">
      <MenuPageMercato />
      <Outlet />
    </div>
  );
};

export default PageMercato;