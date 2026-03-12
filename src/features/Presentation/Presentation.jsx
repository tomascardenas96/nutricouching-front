import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../presentation/SearchInput";
import "./Presentation.css";

// QueryClient fuera del componente para evitar recrearlo en cada render
const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </QueryClientProvider>
        </form>

        <Link to="/filter/professionals" className="hero__see-all">
          Ver todos los profesionales disponibles
        </Link>
      </div>
    </section>
  );
}

export default Presentation;
