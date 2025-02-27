import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "bars/Menu";
import PageHome from "pages/PageHome";
import Page404 from "pages/Page404";


const Router: React.FC = (props) => {
  return (
    <div id="Router" className="d-flex flex-column flex-md-row h-100">
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