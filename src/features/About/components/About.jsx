import { TbCircleCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./About.css";

const FEATURES = [
  "Enfoque integral y actualizado",
  "Acompañamiento profesional continuo",
  "Guías y recursos complementarios",
  "Evaluación y seguimiento periódico",
];

function About() {
  return (
    <section className="about" id="about">
      <div className="about__image">
        <img
          src="/assets/about-img.jpg"
          alt="Profesional de Cohesiva Salud"
          onError={(e) => {
            e.currentTarget.src = "/assets/no-picture.png";
          }}
        />
      </div>

      <div className="about__content">
        <span className="about__eyebrow">¿A qué nos dedicamos?</span>

        <h2 className="about__title">
          Cohesiva Salud es un Centro Integral de Salud Online
        </h2>

        <p className="about__description">
          Conectamos a usuarios con profesionales de la salud alimentaria y
          ofrecemos turnos online, planes personalizados y más!
        </p>

        <ul className="about__features">
          {FEATURES.map((f) => (
            <li key={f}>
              <TbCircleCheckFilled className="about__check" />
              {f}
            </li>
          ))}
        </ul>

        <Link to="/professionals" className="about__cta">
          Ver más
        </Link>
      </div>
    </section>
  );
}

export default About;
