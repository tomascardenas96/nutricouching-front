import About from "../../About/components/About";
import Presentation from "../../Presentation/Presentation";
import Products from "../../products/components/Products";
import Services from "../../services/components/Services";
import Viands from "../../viands/components/Viands";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="presentation_container">
        <Presentation />
      </section>

      <section className="services_container" id="services">
        <Services />
      </section>

      <section className="products_container" id="products">
        <Products />
      </section>

      <section className="recipes_container">
        <Viands />
      </section>

      <section className="about-us_container" id="about">
        <About />
      </section>
    </div>
  );
}

export default Home;
