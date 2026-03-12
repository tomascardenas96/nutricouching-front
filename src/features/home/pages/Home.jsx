import { Helmet } from "react-helmet-async";
import About from "../../about/components/About";
import Banner from "../../banner/components/Banner";
import Presentation from "../../Presentation/Presentation";
import ProductsHome from "../../products/components/ProductsHome";
import PromoCards from "../../promo-cards/PromoCards";
import Services from "../../services/components/home/Services";
import "./Home.css";
import ViandsHome from "../../viands/components/ViandsHome";
import Testimonials from "../../testimonials/components/Testimonials";

function Home() {
  return (
    <>
      <Helmet>
        <title>Inicio | Cohesiva Salud</title>
        <meta
          name="description"
          content="Conocé más sobre nuestra empresa, nuestros valores y nuestra historia."
        />
      </Helmet>

      <div className="home-container">
        <section className="presentation_container">
          <Presentation />
        </section>

        <section className="services_container" id="services">
          <Services />
        </section>

        <section className="about_container" id="about">
          <About />
        </section>

        <section>
          <PromoCards />
        </section>

        <section>
          <Banner />
        </section>

        <section className="home-section products_container" id="products">
          <ProductsHome />
        </section>

        <section className="home-section viands_container" id="viands">
          <ViandsHome />
        </section>

        <section className="testimonials_container" id="testimonials">
          <Testimonials />
        </section>

        {/* <section className="home-section recipes_container">
          <div className="section-title">
            <h1 className="special-font">Viandas y Recetas</h1>
            <hr />
          </div>
          <Viands />
        </section>

        <section className="home-section quotes-section_container" id="quotes">
          <div className="section-title">
            <h1 className="special-font">
              Testimonios de nuestros clientes...
            </h1>
            <hr />
          </div>

          <Quotes />
        </section>

        <section className="faq_container" id="faq">
          <Faq />
        </section> */}
      </div>
    </>
  );
}

export default Home;
