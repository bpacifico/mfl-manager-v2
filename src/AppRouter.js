import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import PageMercatoSales from "pages/pagemercato/PageMercatoSales.js";

const AppRouter: React.FC = () => {
  const location = useLocation();
  const [yScrollPosition, setYScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const { scrollTop } = event.target;
    const scroll = scrollTop;
    setYScrollPosition(scroll);
  }

  React.useEffect(() => {
    document.getElementById("AppContent-content")
      .scroll({
        top: 0,
        behavior: "smooth",
      });
  }, [location.pathname]);

  return (
    <div id="AppRouter" className="d-flex flex-column flex-md-row vh-100">
      <div id="AppMenu" className="order-2 order-md-1">
        <Menu />
      </div>

      <div
        id="AppContent"
        className="order-1 order-md-2 flex-fill"
      >
        <div
          id="AppContent-content"
          className="position-relative h-100 w-100"
          onScroll={handleScroll}
        >
          <Routes>
            <Route
              path="/"
              element={<PageHome
                yScrollPosition={yScrollPosition}
              />}
            />
            <Route
              path="dash"
              element={<PageDash
                yScrollPosition={yScrollPosition}
              />}
            >
              <Route
                index
                element={<PageDashPlayers />}
              />
              <Route
                path="players"
                element={<PageDashPlayers />}
              />
              <Route
                path="clubs"
                element={<PageDashClubs />}
              />
              <Route
                path="competitions"
                element={<PageDashCompetitions />}
              />
            </Route>
            <Route
              path="mercato"
              element={<PageMercato
                yScrollPosition={yScrollPosition}
              />}
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
                path="sales"
                element={<PageMercatoSales />}
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
  );
};

export default AppRouter;