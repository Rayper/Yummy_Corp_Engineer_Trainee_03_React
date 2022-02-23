import React from "react";
import { Link, NavLink } from "react-router-dom";

// cara dengan stateless components
const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
                <div className="position-sticky pt-3">
                  <ul className="nav flex-column">
                    {/* ubah a jadi link supaya clickable */}
                    <li className="nav-item">
                      <NavLink to={"/"} exact className="nav-link">
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to={'/users'} className="nav-link">
                        Users
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to={'/roles'} className="nav-link">
                        Roles
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
    )
}

export default Menu;