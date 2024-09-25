import useGetProfessionals from "../../hooks/useGetProfessionals";
import "./About.css";
import AboutCard from "./AboutCard";

function About() {
  const { professionals, professionalsLoading, professionalsError } =
    useGetProfessionals();

  return (
    <div className="about">
      <div className="about-header">
        <h1>Nuestro equipo de profesionales... </h1>
      </div>
      <div className="about-body">
        <div className="cards-container">
          {professionals?.map((professional) => (
            <AboutCard
              key={professional.professionalId}
              image={professional.image}
              name={professional.fullname}
              role={professional.specialty}
            />
          ))}
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
