import "./About.css";
import AboutCard from "./AboutCard";

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>Nuestro equipo de profesionales... </h1>
      </div>
      <div className="about-body">
        <div className="cards-container">
          <AboutCard
            image="natasha.png"
            name="Natasha Dirialdi"
            role="NUTRICIONISTA / COACHING"
          />
          <AboutCard
            image="lore.jpg"
            name="Lorena Arlan"
            role="COACHING PROFESIONAL"
          />
          <AboutCard
            image="mica.png"
            name="Micaela Aguilar"
            role="EDUCACION FISICA"
          />
          <AboutCard
            image="pepa.png"
            name="Joaquin Cardenas"
            role="KINESIOLOGIA HOLISTICA"
          />
        </div>
      </div>
      <div className="brand-footer">
        <img src="/src/public/assets/nutricouching-logo.jpg" alt="" />
        <p>Nutri-coaching Integral ©</p>
      </div>
    </div>
  );
}

export default About;
