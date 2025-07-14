import { NavLink, Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import "../App.css";
import { AuthenticationContext } from "../context/AuthenticationContext";

export default function Layout() {
  const [view, setView] = useState(false);
  const {isLoggedIn, handleLogout} = useContext(AuthenticationContext)
  console.log(isLoggedIn);
  

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

          {/* to be deleted
          <NavLink className="menu" to="/data">
            Saved
          </NavLink> */}
          {isLoggedIn ? 
            <a className="menu" onClick={() => {handleLogout()}}>Log out</a> :
          <NavLink className="menu" to="/register">
            Register
          </NavLink>}
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


              {/* to be deleted */}
            <NavLink
              className="menu"
              to="/data"
              onClick={() => {
                setView(!view);
              }}
            >
              Saved
            </NavLink>

            <NavLink
              className="menu"
              to="/register"
              onClick={() => {
                setView(!view);
              }}
            >
              Register
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
