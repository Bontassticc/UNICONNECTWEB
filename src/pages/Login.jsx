
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";

const DEMO_EMAIL = "demo@uniconnect.example";

const DEMO_ACADEMIC_DATA = {
  profile: {
    firstName: "Demo",
    surname: "Student",
    school: "Example High School",
    province: "Gauteng",
    grade: "12",
  },
  marks: {},
  aps: null,
  selectedProgramme: null,
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);

  const startSession = (accountEmail) => {
    localStorage.setItem("uniConnectLoggedIn", "true");
    localStorage.setItem(
      "uniConnectUserEmail",
      accountEmail
    );

    window.dispatchEvent(
      new Event("uniConnectUserChanged")
    );

    navigate("/profile", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setStatus({
        type: "error",
        message: "Please enter your email and passphrase.",
      });
      return;
    }

    let accounts;

    try {
      accounts = JSON.parse(
        localStorage.getItem("uniConnectDemoAccounts") ||
          "{}"
      );
    } catch {
      setStatus({
        type: "error",
        message:
          "Account information could not be loaded. Please try again.",
      });
      return;
    }

    const account = accounts[normalizedEmail];

    if (!account || account.passphrase !== password) {
      setStatus({
        type: "error",
        message:
          "Incorrect email or passphrase. Please try again, or create a demonstration account.",
      });
      return;
    }

    startSession(normalizedEmail);
  };

  const handleExploreDemo = () => {
    setStatus(null);

    let users;

    try {
      users = JSON.parse(
        localStorage.getItem("uniConnectUsers") || "{}"
      );
    } catch {
      setStatus({
        type: "error",
        message:
          "Saved academic data could not be loaded.",
      });
      return;
    }

    // Create sample data only if the demo account
    // does not already exist. Never overwrite
    // a previously saved demo profile.
    if (!users[DEMO_EMAIL]) {
      users[DEMO_EMAIL] = DEMO_ACADEMIC_DATA;

      localStorage.setItem(
        "uniConnectUsers",
        JSON.stringify(users)
      );
    }

    startSession(DEMO_EMAIL);
  };

  return (
    <>
      <Navbar />

      <main className="uc-login-page">
        <div className="uc-login-layout">

          {/* WELCOME PANEL */}

          <section className="uc-login-welcome">
            <div className="uc-login-welcome-icon">
              <GraduationCap
                size={32}
                strokeWidth={1.8}
              />
            </div>

            <span className="uc-login-eyebrow">
              YOUR ACADEMIC JOURNEY
            </span>

            <h1>
              Your future starts
              <span> with possibility.</span>
            </h1>

            <p>
              UniConnect helps you understand your academic
              results, explore university programmes, and
              discover opportunities that match your goals.
            </p>

            <div className="uc-login-benefits">
              <div>
                <CheckCircle2 size={20} />
                <span>
                  Keep your academic results in one place
                </span>
              </div>

              <div>
                <CheckCircle2 size={20} />
                <span>
                  Calculate your Admission Point Score
                </span>
              </div>

              <div>
                <CheckCircle2 size={20} />
                <span>
                  Explore programmes and eligibility
                </span>
              </div>
            </div>

            <div className="uc-login-welcome-footer">
              <BookOpen size={19} />
              <span>
                Making higher education easier to navigate.
              </span>
            </div>
          </section>

          {/* LOGIN CARD */}

          <section className="uc-login-card">
            <div className="uc-login-card-heading">
              <div className="uc-login-form-icon">
                <LockKeyhole size={23} />
              </div>

              <span className="uc-login-eyebrow">
                STUDENT ACCESS
              </span>

              <h2>Welcome Back</h2>

              <p>
                Log in with your registered demonstration
                account to access your academic profile.
              </p>
            </div>

            {status && (
              <div
                className={`uc-login-status ${status.type}`}
                role="alert"
              >
                {status.message}
              </div>
            )}

            <form
              className="uc-login-form"
              onSubmit={handleSubmit}
            >
              <div className="uc-login-field">
                <label htmlFor="login-email">
                  Email Address
                </label>

                <div className="uc-login-input-wrap">
                  <Mail
                    size={19}
                    aria-hidden="true"
                  />

                  <input
                    id="login-email"
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
                <label htmlFor="login-password">
                  Demonstration Passphrase
                </label>

                <div className="uc-login-input-wrap">
                  <LockKeyhole
                    size={19}
                    aria-hidden="true"
                  />

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your passphrase"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
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
                    aria-pressed={showPassword}
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
                Log In
                <ArrowRight size={19} />
              </button>
            </form>

            {/* DEMO ACCESS */}

            <div className="uc-demo-access">
              <div className="uc-demo-divider">
                <span>OR</span>
              </div>

              <button
                type="button"
                className="uc-demo-button"
                onClick={handleExploreDemo}
              >
                <PlayCircle size={19} />
                Explore Demo
              </button>

              <p className="uc-demo-description">
                Exploring UniConnect for an assessment?
                Enter the demonstration without creating
                an account.
              </p>
            </div>

            <div className="uc-login-demo-note">
              <ShieldCheck size={19} />

              <p>
                <strong>Prototype access:</strong>{" "}
                Accounts are stored locally in this browser.
                This is not secure authentication. Use
                fictional details and never enter a
                password you use elsewhere.
              </p>
            </div>

            <div className="uc-login-bottom">
              New to UniConnect?{" "}
              <Link to="/signup">
                Create an Account
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
