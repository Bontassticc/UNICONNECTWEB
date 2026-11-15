
import { useEffect, useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  LogIn,
  LogOut,
  UserRoundPlus,
  GraduationCap,
} from "lucide-react";

function Navbar() {
  const location = useLocation();

  return <NavbarContent key={location.pathname} />;
}

function NavbarContent() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () =>
      localStorage.getItem("uniConnectLoggedIn") ===
      "true"
  );

  const [menuOpen, setMenuOpen] = useState(false);

  // Keep login status in sync with account changes.
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(
        localStorage.getItem("uniConnectLoggedIn") ===
          "true"
      );
    };

    window.addEventListener(
      "storage",
      checkLoginStatus
    );

    window.addEventListener(
      "uniConnectUserChanged",
      checkLoginStatus
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkLoginStatus
      );

      window.removeEventListener(
        "uniConnectUserChanged",
        checkLoginStatus
      );
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("uniConnectLoggedIn");
    localStorage.removeItem("uniConnectUserEmail");

    window.dispatchEvent(
      new Event("uniConnectUserChanged")
    );

    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav
      className="navbar"
      aria-label="Main navigation"
    >
      {/* LOGO */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
        aria-label="UniConnect Home"
      >
        <GraduationCap
          size={27}
          strokeWidth={2}
          aria-hidden="true"
        />
        <span>UniConnect</span>
      </Link>

      {/* MOBILE MENU */}

      <button
        type="button"
        className={`hamburger ${
          menuOpen ? "active" : ""
        }`}
        onClick={() =>
          setMenuOpen((previous) => !previous)
        }
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        aria-controls="uniconnect-nav-links"
      >
        {menuOpen ? (
          <X size={26} aria-hidden="true" />
        ) : (
          <Menu size={26} aria-hidden="true" />
        )}
      </button>

      {/* NAVIGATION LINKS */}

      <div
        id="uniconnect-nav-links"
        className={`nav-links ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        <NavLink
          to="/"
          end
          className={navClass}
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/programmes"
          className={navClass}
          onClick={closeMenu}
        >
          Programmes
        </NavLink>

        <NavLink
          to="/universities"
          className={navClass}
          onClick={closeMenu}
        >
          Universities
        </NavLink>

        <NavLink
          to="/profile"
          className={navClass}
          onClick={closeMenu}
        >
          Academic Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={navClass}
          onClick={closeMenu}
        >
          Settings
        </NavLink>

        {/* ACCOUNT ACTIONS */}

        {isLoggedIn ? (
          <button
            type="button"
            className="nav-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} aria-hidden="true" />
            <span>Log Out</span>
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="nav-login"
              onClick={closeMenu}
            >
              <LogIn size={17} aria-hidden="true" />
              <span>Log In</span>
            </NavLink>

            <NavLink
              to="/signup"
              className="nav-signup"
              onClick={closeMenu}
            >
              <UserRoundPlus
                size={17}
                aria-hidden="true"
              />
              <span>Sign Up</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
