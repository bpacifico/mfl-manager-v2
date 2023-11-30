import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "bars/Menu";
import PageHome from "pages/PageHome";
import PageDash from "pages/PageDash";
import PageMercato from "pages/PageMercato";
import PageMap from "pages/PageMap.js";
import Page404 from "pages/Page404";
import PageDashPlayers from "pages/pagedash/PageDashPlayers.js";
import PageDashCompetitions from "pages/pagedash/PageDashCompetitions.js";
import PageDashClubs from "pages/pagedash/PageDashClubs.js";
import PageMercatoContracts from "pages/pagemercato/PageMercatoContracts.js";
import PageMercatoTrades from "pages/pagemercato/PageMercatoTrades.js";
import BoxBeta from "components/box/BoxBeta.js";

const AppRouter: React.FC = () => {
  return (
    <div id="AppRouter" className="d-flex flex-column flex-md-row vh-100">
      <BoxBeta />

      <div id="AppMenu" className="order-2 order-md-1">
        <Menu />
      </div>

      <div id="AppContent" className="order-1 order-md-2 flex-fill">
        <div className="AppContent-decoration position-relative w-100 h-100">
          <div className="top-left-quarter-circle"/>
          <div className="bottom-left-quarter-circle"/>
          <div className="centered-left-half-circle"/>
          <div className="centered-left-dot"/>

          <div className="AppContent-content position-relative h-100 w-100 px-1 px-md-5 py-4">
            <Routes>
              <Route
                path="/"
                element={<PageHome />}
              />
              <Route
                path="dash"
                element={<PageDash />}
              >
                <Route
                  index
                  element={<PageDashCompetitions />}
                />
                <Route
                  path="competitions"
                  element={<PageDashCompetitions />}
                />
                <Route
                  path="clubs"
                  element={<PageDashClubs />}
                />
                <Route
                  path="players"
                  element={<PageDashPlayers />}
                />
              </Route>
              <Route
                path="mercato"
                element={<PageMercato />}
              >
                <Route
                  index
                  element={<PageMercatoContracts />}
                />
                <Route
                  path="contracts"
                  element={<PageMercatoContracts />}
                />
                <Route
                  path="trades"
                  element={<PageMercatoTrades />}
                />
              </Route>
              <Route
                path="map"
                element={<PageMap />}
              />

              {/* 404 */}
              <Route
                element={<Page404 />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRouter;