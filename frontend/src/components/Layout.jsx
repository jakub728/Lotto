import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

export default function Layout() {
  return (
    <>
      <header className="big">
        <h1>LOTTO APP</h1>
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

          <NavLink className="menu" to="/login">
            Login
          </NavLink>
        </div>
      </header>
      <header className="small">
        <h1>LOTTO APP</h1>
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

          <NavLink className="menu" to="/login">
            Login
          </NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
