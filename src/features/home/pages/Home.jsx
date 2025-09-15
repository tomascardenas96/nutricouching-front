import Categories from "../../category/components/Categories";
import Faq from "../../faq/components/Faq";
import Presentation from "../../Presentation/Presentation";
import Products from "../../products/components/Products";
import Quotes from "../../quotes/components/Quotes";
import Services from "../../services/components/home/Services";
import Viands from "../../viands/components/Viands";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="presentation_container">
        <Presentation />
      </section>

      <section className="home-section disciplines_container">
        <Categories />
      </section>

      <section className="home-section services_container" id="services">
        <div className="section-title">
          <h1 className="special-font">Servicios Disponibles</h1>
          <hr />
        </div>
        <Services />
      </section>

      <section className="home-section products_container" id="products">
        <div className="section-title">
          <h1 className="special-font">Nuestros Productos y Viandas</h1>
          <hr />
        </div>
        <Products />
      </section>

      <section className="home-section recipes_container">
        {/* <Viands /> */}
        <Viands />
      </section>

      <section className="home-section quotes-section_container" id="quotes">
        <div className="section-title">
          <h1 className="special-font">Testimonios de nuestros clientes...</h1>
          <hr />
        </div>

        <Quotes />
      </section>

      <section className="home-section faq_container" id="faq">
        <div className="section-title">
          <h1 className="special-font">Preguntas Frecuentes (FAQ)</h1>
          <hr />
        </div>

        <Faq />
      </section>
    </div>
  );
}

export default Home;
