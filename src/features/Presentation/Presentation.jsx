import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CiApple } from "react-icons/ci";
import { GiStrongMan } from "react-icons/gi";
import { PiBrainLight } from "react-icons/pi";
import { TbBrandCouchdb, TbMessage2Heart } from "react-icons/tb";
import SearchInput from "../presentation/SearchInput";
import "./Presentation.css";

function Presentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = new QueryClient();

  return (
    <section className="presentation">
      <div className="background-image">
        <div className="content">
          <h1>Encuentra el profesional perfecto para tu bienestar</h1>
          <p>
            Conecta con expertos en salud y bienestar para mejorar tu calidad de
            vida
          </p>
          <form className="search-input">
            <QueryClientProvider client={queryClient}>
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </QueryClientProvider>
          </form>
          <div className="professional-items">
            <p onClick={() => setSearchTerm("Nutricion")}>
              <CiApple />
              Nutricion
            </p>
            <p onClick={() => setSearchTerm("Mindfulness")}>
              <PiBrainLight />
              Mindfulness
            </p>
            <p onClick={() => setSearchTerm("Fitness")}>
              <GiStrongMan />
              Fitness
            </p>
            <p onClick={() => setSearchTerm("Coaching")}>
              <TbMessage2Heart />
              Coaching
            </p>
            <p onClick={() => setSearchTerm("Psicologia")}>
              <TbBrandCouchdb />
              Psicologia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Presentation;
