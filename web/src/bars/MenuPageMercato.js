import React from 'react';
import "./MenuPageMercato.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuPageMercatoProps {}

const MenuPageMercato: React.FC<MenuPageMercatoProps> = (props) => {
  const location = useLocation();

  return (
    <nav id="MenuPageMercato" className="navbar justify-content-center justify-content-md-start w-100 ps-md-5 p-2">
      <ul className="navbar-nav flex-row h6 ps-md-3">
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="contracts"
            className={"nav-link"
              + (["/mercato", "/mercato/", "/mercato/contracts"].indexOf(location.pathname) >= 0 ? " active" : "")}
          >
            <i className="bi bi-file-earmark-medical mx-1"></i>
            <span className="d-none d-md-inline ms-1">Contracts</span>
          </Link>
        </li>
        <li className="nav-item align-self-end lh-1 px-2">
          <Link
            to="sales"
            className={"nav-link" + (location.pathname === "/mercato/sales" ? " active" : "")}
          >
            <i className="bi bi-cash-coin mx-1"></i>
            <span className="d-none d-md-inline ms-1">Sales</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuPageMercato;
