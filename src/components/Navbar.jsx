import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("uniConnectLoggedIn") === "true"
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(
        localStorage.getItem("uniConnectLoggedIn") === "true"
      );
    };

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("uniConnectUserChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("uniConnectUserChanged", checkLoginStatus);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("uniConnectLoggedIn");
    localStorage.removeItem("uniConnectUserEmail");

    window.dispatchEvent(new Event("uniConnectUserChanged"));

    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo" onClick={closeMenu}>
        UniConnect
      </Link>

      <button
        type="button"
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/programmes" onClick={closeMenu}>
          Programmes
        </Link>

        <Link to="/universities" onClick={closeMenu}>
          Universities
        </Link>

        <Link to="/profile" onClick={closeMenu}>
          Academic Profile
        </Link>

        <Link to="/settings" onClick={closeMenu}>
          Settings
        </Link>

        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className="nav-logout"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Log In
          </Link>
        )}

      </div>
    </nav>
  );
}

export default Navbar;