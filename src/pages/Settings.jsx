import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Settings() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("uniConnectTheme") === "dark"
  );

  const [status, setStatus] = useState(null);


  // --------------------------------
  // Apply theme
  // --------------------------------

  useEffect(() => {

    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("uniConnectTheme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("uniConnectTheme", "light");
    }

  }, [darkMode]);


  // --------------------------------
  // Logout
  // --------------------------------

  const handleLogout = () => {
  localStorage.removeItem("uniConnectLoggedIn");
  localStorage.removeItem("uniConnectUserEmail");

  window.dispatchEvent(new Event("uniConnectUserChanged"));

  setStatus({
    type: "success",
    message: "You have been logged out successfully."
  });

  setTimeout(() => {
    navigate("/login");
  }, 700);
};


  return (

    <>

      <Navbar />

      <main className="settings-page">

        <div className="settings-header">

          <h1>Settings</h1>

          <p>
            Manage your UniConnect preferences and academic profile.
          </p>

        </div>


        {status && (

          <div
            className={`profile-status ${status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </div>

        )}


        {/* Appearance */}

        <section className="settings-card">

          <div className="settings-card-header">

            <h2>Appearance</h2>

            <p>
              Choose how UniConnect looks on your device.
            </p>

          </div>


          <div className="settings-option">

            <div>

              <h3>Dark Mode</h3>

              <p>
                Use a darker interface for lower-light environments.
              </p>

            </div>


            <button
              type="button"
              className={`theme-toggle ${
                darkMode ? "active" : ""
              }`}
              onClick={() => setDarkMode(!darkMode)}
              aria-pressed={darkMode}
              aria-label={
                darkMode
                  ? "Turn dark mode off"
                  : "Turn dark mode on"
              }
            >

              <span>
                {darkMode ? "On" : "Off"}
              </span>

            </button>

          </div>

        </section>


        {/* Academic Profile */}

        <section className="settings-card">

          <div className="settings-card-header">

            <h2>Academic Profile</h2>

            <p>
              Manage the academic information used by UniConnect.
            </p>

          </div>


          <div className="settings-links">

            <Link
              to="/profile"
              className="settings-link"
            >
              Edit Academic Profile
            </Link>

          </div>

        </section>


        {/* Account & Privacy */}

        <section className="settings-card">

          <div className="settings-card-header">

            <h2>Account & Privacy</h2>

            <p>
              Manage your account and understand how your information
              is handled.
            </p>

          </div>


          <div className="privacy-info">

            <p>
              Your academic profile is stored locally on this device
              for this prototype.
            </p>

          </div>


          <button
            type="button"
            className="reset-btn"
            onClick={handleLogout}
          >
            Log Out
          </button>

        </section>

      </main>

    </>

  );

}

export default Settings;