import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../presentation/SearchInput";
import "./Presentation.css";

function Presentation() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="hero">
      <div className="hero__backdrop" />

      <div className="hero__content">
        <span className="hero__eyebrow">
          Un profesional para cada necesidad
        </span>

        <h1 className="hero__title">
          Explorá Nuestro
          <br />
          <em>Catálogo de Profesionales</em>
        </h1>

        <form className="hero__search">
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </form>

        <Link to="/professionals" className="hero__see-all">
          Ver todos los profesionales disponibles
        </Link>
      </div>
    </section>
  );
}

export default Presentation;
