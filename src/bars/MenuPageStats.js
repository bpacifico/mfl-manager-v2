import React from 'react';
import "./MenuPageStats.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuPageStatsProps {}

const MenuPageStats: React.FC<MenuPageStatsProps> = (props) => {
  const location = useLocation();

  return (
    <nav id="MenuPageStats" className="navbar justify-content-center w-100 p-2 mb-5">
      <ul className="navbar-nav flex-row h6">
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="general"
            className={"nav-link"
              + (["/stats", "/stats/", "/stats/general"].indexOf(location.pathname) >= 0 ? " active" : "")}
          >
            General
          </Link>
        </li>
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="competitions"
            className={"nav-link" + (location.pathname === "/stats/competitions" ? " active" : "")}
          >
            Competitions
          </Link>
        </li>
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="clubs"
            className={"nav-link" + (location.pathname === "/stats/clubs" ? " active" : "")}
          >
            Clubs
          </Link>
        </li>
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="players"
            className={"nav-link" + (location.pathname === "/stats/players" ? " active" : "")}
          >
            Players
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuPageStats;
