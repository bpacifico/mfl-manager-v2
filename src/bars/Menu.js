import React from 'react';
import "./Menu.css";
import { Link, useLocation } from 'react-router-dom';

interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const location = useLocation();

  return (
    <nav id="Menu" className="navbar h-100 px-3 px-md-4 py-3">
      <ul className="navbar-nav flex-column h4">
        <li className="nav-item">
          <Link
            to="/"
            className={"nav-link" + (location.pathname === "/" ? " active" : "")}
          >
            {location.pathname === "/"
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                Home
              </span>
            }
            <div>
              <i className="bi bi-house"></i>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/stats"
            className={"nav-link" + (location.pathname.startsWith("/stats") ? " active" : "")}
          >
            {location.pathname.startsWith("/stats")
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                MFL Stats
              </span>
            }
            <div>
              <i className="bi bi-speedometer"></i>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/mercato"
            className={"nav-link" + (location.pathname.startsWith("/mercato") ? " active" : "")}
          >
            {location.pathname.startsWith("/mercato")
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                Mercato
              </span>
            }
            <div>
              <i className="bi bi-person-bounding-box"></i>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/builder"
            className={"nav-link" + (location.pathname.startsWith("/builder") ? " active" : "")}
          >
            {location.pathname.startsWith("/builder")
              && <span
                className="text-center text-capitalize w-100 lh-1 pt-1 pb-2"
              >
                Team Builder
              </span>
            }
            <div>
              <i className="bi bi-cone-striped"></i>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}



export default Menu;
