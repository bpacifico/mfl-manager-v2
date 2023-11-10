import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "bars/Menu";
import PageHome from "pages/PageHome";
import PageStats from "pages/PageStats";
import PageMercato from "pages/PageMercato";
import PageBuilder from "pages/PageBuilder.js";
import Page404 from "pages/Page404";
import PageStatsPlayers from "pages/pagestats/PageStatsPlayers.js";
import PageStatsCompetitions from "pages/pagestats/PageStatsCompetitions.js";
import PageStatsClubs from "pages/pagestats/PageStatsClubs.js";
import PageMercatoContracts from "pages/pagemercato/PageMercatoContracts.js";
import PageMercatoTrades from "pages/pagemercato/PageMercatoTrades.js";

const AppRouter: React.FC = () => {
  return (
    <div id="AppRouter" className="row g-0 h-100">
      <div id="AppMenu" className="col-auto h-100 pe-0">
        <Menu />
      </div>

      <div id="AppContent" className="col h-100">
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
                path="stats"
                element={<PageStats />}
              >
                <Route
                  index
                  element={<PageStatsCompetitions />}
                />
                <Route
                  path="competitions"
                  element={<PageStatsCompetitions />}
                />
                <Route
                  path="clubs"
                  element={<PageStatsClubs />}
                />
                <Route
                  path="players"
                  element={<PageStatsPlayers />}
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
                path="builder"
                element={<PageBuilder />}
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