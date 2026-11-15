
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRoundPlus,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import Navbar from "../components/Navbar";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Your demonstration passphrase must contain at least 6 characters."
      );
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem("uniConnectDemoAccounts") || "{}"
    );

    if (accounts[normalizedEmail]) {
      setError(
        "This demonstration account already exists. Please log in."
      );
      return;
    }

    accounts[normalizedEmail] = {
      name: name.trim(),
      passphrase: password,
    };

    localStorage.setItem(
      "uniConnectDemoAccounts",
      JSON.stringify(accounts)
    );

    localStorage.setItem("uniConnectLoggedIn", "true");
    localStorage.setItem(
      "uniConnectUserEmail",
      normalizedEmail
    );

    window.dispatchEvent(
      new Event("uniConnectUserChanged")
    );

    navigate("/profile", { replace: true });
  };

  return (
    <>
      <Navbar />

      <main className="uc-login-page">
        <div className="uc-login-layout">

          <section className="uc-login-welcome">
            <div className="uc-login-welcome-icon">
              <GraduationCap size={32} />
            </div>

            <span className="uc-login-eyebrow">
              START YOUR JOURNEY
            </span>

            <h1>
              Your future starts
              <span> with possibility.</span>
            </h1>

            <p>
              Create a demonstration student account to
              explore programmes, calculate your APS,
              and build your academic profile.
            </p>
          </section>

          <section className="uc-login-card">
            <div className="uc-login-card-heading">
              <div className="uc-login-form-icon">
                <UserRoundPlus size={23} />
              </div>

              <span className="uc-login-eyebrow">
                NEW STUDENT
              </span>

              <h2>Create an Account</h2>

              <p>
                Get started with your UniConnect
                academic journey.
              </p>
            </div>

            {error && (
              <div
                className="uc-login-status error"
                role="alert"
              >
                {error}
              </div>
            )}

            <form
              className="uc-login-form"
              onSubmit={handleSubmit}
            >
              <div className="uc-login-field">
                <label htmlFor="signup-name">
                  First Name
                </label>

                <div className="uc-login-input-wrap">
                  <UserRound size={19} />

                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your first name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    autoComplete="given-name"
                    required
                  />
                </div>
              </div>

              <div className="uc-login-field">
                <label htmlFor="signup-email">
                  Email Address
                </label>

                <div className="uc-login-input-wrap">
                  <Mail size={19} />

                  <input
                    id="signup-email"
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="uc-login-field">
                <label htmlFor="signup-password">
                  Demonstration Passphrase
                </label>

                <div className="uc-login-input-wrap">
                  <LockKeyhole size={19} />

                  <input
                    id="signup-password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="uc-login-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide passphrase"
                        : "Show passphrase"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="uc-login-submit"
              >
                Create Account
                <ArrowRight size={19} />
              </button>
            </form>

            <div className="uc-login-demo-note">
              This is a browser-local prototype.
              Use fictional details and a passphrase
              you do not use anywhere else.
              Demonstration accounts are not secure.
            </div>

            <div className="uc-login-bottom">
              Already have an account?{" "}
              <Link to="/login">
                Log In
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default SignUp;
