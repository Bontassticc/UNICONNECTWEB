import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);


  // --------------------------------
  // Handle login
  // --------------------------------

  const handleSubmit = (e) => {

    e.preventDefault();

    setStatus(null);

    if (!email.trim() || !password.trim()) {

      setStatus({
        type: "error",
        message: "Please enter your email and password."
      });

      return;
    }


    // Prototype login state
    localStorage.setItem("uniConnectLoggedIn", "true");
    localStorage.setItem("uniConnectUserEmail", email.trim());
    
    window.dispatchEvent(new Event("uniConnectUserChanged"));


    setStatus({
      type: "success",
      message: "Login successful. Welcome back."
    });


    setTimeout(() => {
      navigate("/profile");
    }, 700);

  };


  return (
    <>
      <Navbar />

      <main className="login-page">

        <div className="login-card">

          <div className="login-header">

            <h1>Welcome Back</h1>

            <p>
              Log in to access your UniConnect academic profile.
            </p>

          </div>


          {status && (

            <div
              className={`profile-status ${status.type}`}
              role={status.type === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {status.message}
            </div>

          )}


          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <div className="form-field">

              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

            </div>


            <div className="form-field">

              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

            </div>


            <button
              className="primary-btn"
              type="submit"
            >
              Log In
            </button>

          </form>


          <div className="login-footer">

            <p>
              Don't have an account?
            </p>

            <Link to="/profile">
              Create your academic profile
            </Link>

          </div>

        </div>

      </main>
    </>
  );

}

export default Login;