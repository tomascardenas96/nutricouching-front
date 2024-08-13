import "./Categories.css";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { LuHeartPulse } from "react-icons/lu";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { LuWheatOff } from "react-icons/lu";
import { BsPersonArmsUp } from "react-icons/bs";

function Categories() {
  return (
    <div className="categories-menu">
      <div className="title">
        <h1>
          Echa un vistazo a nuestras viandas personalizadas para personas con
          condiciones especificas
        </h1>
        {/* <div className="decoration-line"></div> */}
      </div>
      <div className="categories">
        <div className="category-section">
          <MdOutlineSportsSoccer className="category-icon" />
          <h2>
            Deportistas amateur y personas activas que buscan optimizar su
            rendimiento
          </h2>
          <div className="divider-line"></div>
        </div>

        <div className="category-section">
          <LuHeartPulse className="category-icon" />
          <h2>
            Personas diabeticas que requieren asesoramiento nutricional
            especializado.
          </h2>
          <div className="divider-line"></div>
        </div>

        <div className="category-section">
          <MdOutlineHealthAndSafety className="category-icon" />
          <h2>
            Opciones balanceadas y controladas en calorías para ayudar en el
            control de peso y mejora de salud.
          </h2>
          <div className="divider-line"></div>
        </div>

        <div className="category-section">
          <LuWheatOff className="category-icon" />
          <h2>
            Platos libres de gluten, seguros y sabrosos para personas con
            enfermedad celíaca.
          </h2>
          <div className="divider-line"></div>
        </div>

        <div className="category-section">
          <BsPersonArmsUp className="category-icon" />
          <h2>
            Alternativas saludables y equilibradas para cualquier estilo de
            vida.
          </h2>
        </div>

        {/* Agregar seccion constipacion, vegetarianos, veganos */}
      </div>
    </div>
  );
}

export default Categories;
