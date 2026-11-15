
import { Link } from "react-router-dom";

import {
  Calculator,
  UserRound,
  ClipboardCheck,
  Building2,
  BookOpen,
  Lightbulb,
  ArrowRight,
  GraduationCap,
  FileText,
  Search,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import universities from "../data/universities";
import programmes from "../data/programmes";

// Match university names between the two data files
const universityNameMap = {
  Wits: "Wits University",
  UNISA: "UNISA",
};

function getUniversityProgrammes(university) {
  const universityName =
    universityNameMap[university.shortName] ||
    university.name;

  return programmes.filter(
    (programme) =>
      programme.university === universityName
  );
}

function Features() {
  const features = [
    {
      title: "APS Calculator",
      description:
        "Calculate your Admission Point Score using your Grade 12 subjects and marks.",
      Icon: Calculator,
      link: "/profile",
      action: "Calculate your APS",
    },
    {
      title: "Academic Profile",
      description:
        "Keep your personal details and academic results in one convenient place.",
      Icon: UserRound,
      link: "/profile",
      action: "View your profile",
    },
    {
      title: "Eligibility Checker",
      description:
        "Explore how your academic results compare with university programme requirements.",
      Icon: ClipboardCheck,
      link: "/programmes",
      action: "Check programmes",
    },
    {
      title: "Explore Universities",
      description:
        "Discover South African universities and learn about their available study opportunities.",
      Icon: Building2,
      link: "/universities",
      action: "Explore universities",
    },
    {
      title: "Programme Information",
      description:
        "Understand programme requirements and make more informed decisions about your studies.",
      Icon: BookOpen,
      link: "/programmes",
      action: "Browse programmes",
    },
    {
      title: "Alternative Pathways",
      description:
        "Discover alternative study options when your first-choice programme isn't a match.",
      Icon: Lightbulb,
      link: "/programmes",
      action: "Discover opportunities",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Build Your Profile",
      description:
        "Start by entering your personal information and creating your academic profile.",
      Icon: UserRound,
    },
    {
      number: "02",
      title: "Enter Your Results",
      description:
        "Add your Grade 12 subjects and marks so UniConnect can calculate your APS.",
      Icon: FileText,
    },
    {
      number: "03",
      title: "Explore Your Options",
      description:
        "Browse universities and discover programmes that interest you.",
      Icon: Search,
    },
    {
      number: "04",
      title: "Check Your Eligibility",
      description:
        "Compare your results with admission requirements and explore alternatives.",
      Icon: CheckCircle2,
    },
  ];

  return (
    <>
      {/* ================= FEATURES ================= */}

      <section className="features">
        <div className="section-title">
          <span className="section-eyebrow">
            WHAT UNICONNECT OFFERS
          </span>

          <h2>Everything You Need to Move Forward</h2>

          <p>
            From understanding your results to discovering
            university opportunities, UniConnect helps you
            make informed decisions about your future.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.Icon;

            return (
              <div
                className="feature-card"
                key={feature.title}
              >
                <div className="feature-icon">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <Link
                  to={feature.link}
                  className="feature-link"
                >
                  {feature.action}
                  <ArrowRight size={17} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="how-it-works">
        <div className="section-title">
          <span className="section-eyebrow">
            YOUR JOURNEY
          </span>

          <h2>Four Steps Towards Your Future</h2>

          <p>
            Getting started with UniConnect is simple.
            Follow these steps to discover your academic
            possibilities.
          </p>
        </div>

        <div className="steps">
          {steps.map((step) => {
            const Icon = step.Icon;

            return (
              <div className="step" key={step.number}>
                <div className="step-top">
                  <span className="step-number">
                    {step.number}
                  </span>

                  <div className="step-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="steps-action">
          <Link to="/profile" className="steps-btn">
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}

      <section className="quick-stats">
        <div className="stat-card">
          <Building2 size={25} strokeWidth={1.8} />
          <h2>{universities.length}</h2>
          <p>Universities to Explore</p>
        </div>

        <div className="stat-card">
          <BookOpen size={25} strokeWidth={1.8} />
          <h2>{programmes.length}</h2>
          <p>Programmes to Discover</p>
        </div>

        <div className="stat-card">
          <Calculator size={25} strokeWidth={1.8} />
          <h2>APS</h2>
          <p>Academic Score Calculator</p>
        </div>

        <div className="stat-card">
          <GraduationCap size={25} strokeWidth={1.8} />
          <h2>1</h2>
          <p>Connected Academic Journey</p>
        </div>
      </section>

      {/* ================= FEATURED UNIVERSITIES ================= */}

      <section className="featured-universities">
        <div className="section-title">
          <span className="section-eyebrow">
            DISCOVER YOUR OPTIONS
          </span>

          <h2>Explore South African Universities</h2>

          <p>
            Discover institutions, explore their programmes,
            and take the next step towards your academic future.
          </p>
        </div>

        <div className="featured-universities-grid">
          {universities.slice(0, 3).map((university) => {
            const universityProgrammes =
              getUniversityProgrammes(university);

            return (
              <div
                className="featured-university-card"
                key={university.id}
              >
                <div className="featured-university-icon">
                  <GraduationCap
                    size={25}
                    strokeWidth={1.8}
                  />
                </div>

                <h3>{university.shortName}</h3>

                <div className="featured-university-location">
                  <MapPin size={16} />
                  <span>{university.location}</span>
                </div>

                <div className="featured-university-footer">
                  <span>
                    {universityProgrammes.length}{" "}
                    {universityProgrammes.length === 1
                      ? "Programme"
                      : "Programmes"}
                  </span>

                  <Link to="/universities">
                    Explore
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="featured-universities-action">
          <Link
            to="/universities"
            className="steps-btn"
          >
            Explore All Universities
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Features;
