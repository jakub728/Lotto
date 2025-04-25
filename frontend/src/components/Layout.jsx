import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

export default function Layout() {
  return (
    <>
      <header>
        <div className="menu-wrapper">
          <NavLink className="menu" to="/">
            Home
          </NavLink>

          <NavLink className="menu" to="/results">
            Results
          </NavLink>

          <NavLink className="menu" to="/generate">
            Generate
          </NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
