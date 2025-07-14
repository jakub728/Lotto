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

          {isLoggedIn && <NavLink style={{color: "red"}} className="menu" to="/data">
            Saved
          </NavLink>}
          
          {isLoggedIn ? 
            <a className="menu" style={{color: "grey"}} onClick={() => {handleLogout()}}>Log out</a> :
          <NavLink className="menu" to="/register">
            Sign In
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


            {isLoggedIn && <NavLink
              className="menu"
              style={{color: "red"}}
              to="/data"
              onClick={() => {
                setView(!view);
              }}
            >
              Your numbers
            </NavLink>} 
            
              {isLoggedIn ? <a className="menu" style={{color: "grey"}} onClick={() => {handleLogout()}}>Log out</a> : <NavLink
              className="menu"
              to="/register"
              onClick={() => {
                setView(!view);
              }}
            >
              Sign In
            </NavLink>}
            
          </div>
        ) : null}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
