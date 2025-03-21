import useGetProfessionals from "../../hooks/useGetProfessionals";
import LoaderSpinner from "../Common/LoaderSpinner";
import NetworkError from "../Common/NetworkError";
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
          {!professionalsError ? (
            !professionalsLoading ? (
              professionals?.map((professional) => (
                <AboutCard
                  key={`professional-${professional.professionalId}`}
                  image={professional.image}
                  name={professional.fullname}
                  role={professional.specialty}
                />
              ))
            ) : (
              [...Array(4)].map((_, index) => (
                <div key={`professional-loader_${index}`} className="about-card_loader">
                  <LoaderSpinner />
                </div>
              ))
            )
          ) : (
            <div className="network-error_about">
              <NetworkError message="Ocurrio un error al cargar el contenido" />
            </div>
          )}
        </div>
      </div>

      <div className="brand-footer">
        <img
          src="/src/public/assets/nutricouching-logo.jpg"
          alt="nutricoaching logo"
        />
        <p>Nutri-coaching Integral ©</p>
      </div>
    </div>
  );
}

export default About;
