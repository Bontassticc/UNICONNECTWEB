
import { GraduationCap, Heart, ArrowUpRight } from "lucide-react";

function MeetTheCreator() {
  return (
    <section
      className="creator-section"
      id="meet-the-creator"
      aria-labelledby="creator-heading"
    >
      <div className="creator-container">
        <div className="creator-intro">
          <span className="creator-eyebrow">
            THE PERSON BEHIND UNICONNECT
          </span>

          <h2 id="creator-heading">
            Designed with purpose.
            <br />
            <span>Built for possibility.</span>
          </h2>

          <p>
            Behind every meaningful digital experience is an
            idea, a purpose, and someone who believes things
            can be done differently.
          </p>
        </div>

        <div className="creator-card">
          <div className="creator-avatar" aria-hidden="true">
            <GraduationCap size={46} strokeWidth={1.5} />
          </div>

          <div className="creator-details">
            <span className="creator-role">
              CREATOR & DEVELOPER
            </span>

            <h3>Bonolo Morojele</h3>

            <p className="creator-description">
              A Digital Arts student at the University of the
              Witwatersrand, specialising in Interactive Media
              and digital experiences.
            </p>

            <p className="creator-story">
              UniConnect was born from a simple question:
              why should understanding your university
              opportunities feel so complicated?
            </p>

            <p className="creator-story">
              Created to make university information more
              accessible to South African matriculants,
              UniConnect brings together academic results,
              programme exploration and eligibility guidance
              in one student-centred experience.
            </p>

            <div className="creator-signature">
              <Heart size={17} aria-hidden="true" />

              <span>
                Made with purpose, for the next generation
                of students.
              </span>
            </div>
          </div>
        </div>

        <div className="creator-bottom">
          <span>
            © 2026 UniConnect. Designed & developed by
            Bonolo Morojele.
          </span>

          <a href="#top" className="creator-back-to-top">
            Back to top
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default MeetTheCreator;
