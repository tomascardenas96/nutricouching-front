import { CiApple } from "react-icons/ci";
import { GiStrongMan } from "react-icons/gi";
import { PiBrainLight } from "react-icons/pi";
import { TbBrandCouchdb, TbMessage2Heart } from "react-icons/tb";
import SearchInput from "../presentation/SearchInput";
import "./Presentation.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Presentation() {
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
              <SearchInput />
            </QueryClientProvider>
          </form>
          <div className="professional-items">
            <p>
              <CiApple />
              Nutricion
            </p>
            <p>
              <PiBrainLight />
              Mindfulness
            </p>
            <p>
              <GiStrongMan />
              Fitness
            </p>
            <p>
              <TbMessage2Heart />
              Coaching
            </p>
            <p>
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
