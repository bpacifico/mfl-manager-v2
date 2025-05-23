import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "bars/Menu";
import PageHome from "pages/PageHome";
import Page404 from "pages/Page404";
import PageClub from "pages/PageClub";
import PageProjection from "pages/PageProjection";
import PageDivision from "pages/PageDivision";



const Router: React.FC = (props) => {
  return (
    <div id="Router" className="d-flex flex-column h-100">
      <div id="AppMenu" className="order-2 order-md-1">
        <Menu
          {...props}
        />
      </div>

      <div
        id="AppContent"
        className="order-1 order-md-2 flex-fill"
      >
        <div
          id="AppContent-content"
          className="position-relative h-100 w-100"
        >
          <Routes>
            <Route
              path="/"
              element={<PageHome />}
            />
            <Route 
              path="/club" 
              element={<PageClub />}
            />
            <Route 
              path="/division" 
              element={<PageDivision />}
            />
            <Route path="/club/:clubId" element={<PageClub />} />
            <Route 
              path="/projections" 
              element={<PageProjection />}
            />
            <Route path="/projections/:competitionId" element={<PageProjection />} />
            {/* 404 */}
            <Route
              element={<Page404 />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Router;