import "./Categories.css";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { LuHeartPulse } from "react-icons/lu";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { LuWheatOff } from "react-icons/lu";
import { BsPersonArmsUp } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import ProductsCarousel from "./ProductsCarousel";

function Categories() {
  return (
    <div className="categories-menu">
      <div className="title">
        <h1>
          Echa un vistazo a algunos de nuestros productos, agrega al carrito el
          que mas te guste.
        </h1>
      </div>
      <div className="categories">
        <ProductsCarousel />
        <div className="see-more-products">
          <p>VER MAS</p>
          <FaArrowRight className="enter-here" />
        </div>
      </div>
    </div>
  );
}

export default Categories;

{
  /* <div className="category-section">
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
            Personas con diabetes {`(tipo 2)`} que requieren asesoramiento
            nutricional especializado.
          </h2>
          <div className="divider-line"></div>
        </div>

        <div className="category-section">
          <MdOutlineHealthAndSafety className="category-icon" />
          <h2>
            Opciones equilibradas para ayudar en el control de peso y mejora de
            salud.
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
          <h2>Alternativas saludables para cualquier estilo de vida.</h2>
        </div> */
}
