import React from 'react';
import "./MenuPageDash.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuPageDashProps {}

const MenuPageDash: React.FC<MenuPageDashProps> = (props) => {
  const location = useLocation();

  return (
    <nav id="MenuPageDash" className="navbar justify-content-center w-100 p-2 mb-4 mb-md-5">
      <ul className="navbar-nav flex-row h6">
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="competitions"
            className={"nav-link"
              + (["/dash", "/dash/", "/dash/competitions"].indexOf(location.pathname) >= 0 ? " active" : "")}
          >
            Competitions
          </Link>
        </li>
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="clubs"
            className={"nav-link" + (location.pathname === "/dash/clubs" ? " active" : "")}
          >
            Clubs
          </Link>
        </li>
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="players"
            className={"nav-link" + (location.pathname === "/dash/players" ? " active" : "")}
          >
            Players
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuPageDash;
