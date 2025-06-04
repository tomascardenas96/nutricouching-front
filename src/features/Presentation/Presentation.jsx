import "./Presentation.css";
import { CiSearch } from "react-icons/ci";
import { CiApple } from "react-icons/ci";
import { PiBrainLight } from "react-icons/pi";
import { GiStrongMan } from "react-icons/gi";
import { TbMessage2Heart } from "react-icons/tb";
import { TbBrandCouchdb } from "react-icons/tb";

function Presentation() {
  return (
    <section className="presentation">
      <div className="background-image">
        <div className="content">
          <h1>Encuentra el profesional perfecto para tu bienestar</h1>
          <p>
            Conecta con expertos en salud y bienestar para mejorar tu calidad de
            vida
          </p>
          <div className="search-input">
            <input type="text" placeholder="¿Que estás buscando?" />
            <div className="search-icon">
              <CiSearch />
            </div>
          </div>
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
