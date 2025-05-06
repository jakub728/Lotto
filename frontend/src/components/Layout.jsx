import { NavLink, Outlet } from "react-router-dom";
import "../App.css";
import { useState } from "react";

export default function Layout() {
  const [view, setView] = useState(false);

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

          <NavLink className="menu" to="/data">
            Saved
          </NavLink>
        </div>
      </header>
      <header className="small">
        <h1>
          LOTTO APP
          <p className="burger" onClick={() => setView(!view)}>
            &#9776;
          </p>
        </h1>
        {view ? (
          <div className={`menu-wrapper ${view ? `open` : ``}`}>
            <NavLink
              className="menu"
              to="/"
              onClick={() => {
                setView(!view);
              }}
            >
              Home
            </NavLink>

            <NavLink
              className="menu"
              to="/results"
              onClick={() => {
                setView(!view);
              }}
            >
              Results
            </NavLink>

            <NavLink
              className="menu"
              to="/generate"
              onClick={() => {
                setView(!view);
              }}
            >
              Generate
            </NavLink>

            <NavLink
              className="menu"
              to="/data"
              onClick={() => {
                setView(!view);
              }}
            >
              Saved
            </NavLink>
          </div>
        ) : null}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
