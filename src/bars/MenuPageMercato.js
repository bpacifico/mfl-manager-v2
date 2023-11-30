import React from 'react';
import "./MenuPageMercato.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuPageMercatoProps {}

const MenuPageMercato: React.FC<MenuPageMercatoProps> = (props) => {
  const location = useLocation();

  return (
    <nav id="MenuPageMercato" className="navbar justify-content-center w-100 p-2 mb-4 mb-md-5">
      <ul className="navbar-nav flex-row h6">
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="contracts"
            className={"nav-link"
              + (["/mercato", "/mercato/", "/mercato/contracts"].indexOf(location.pathname) >= 0 ? " active" : "")}
          >
            Contracts
          </Link>
        </li>
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="trades"
            className={"nav-link" + (location.pathname === "/mercato/trades" ? " active" : "")}
          >
            Trades
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuPageMercato;
