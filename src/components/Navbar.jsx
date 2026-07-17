import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        UniConnect
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/programmes">
          Programmes
        </Link>

        <Link to="/universities">
          Universities
        </Link>


       <Link to="/profile">Academic Profile</Link>


      </div>

    </nav>
  );
}

export default Navbar;