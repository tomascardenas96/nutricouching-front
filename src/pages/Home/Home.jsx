import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Presentation from "../../components/Presentation/Presentation";
import Carousel from "../../components/Recipes/Carousel";
import Services from "../../components/Services/Services";
import Products from "../../components/Products/Products";
import "./Home.css";

function Home() {
  return (
    <main>
      {/* Este div contiene la pantalla principal para que su height sea del 100svh */}
      <div className="main-screen_container">
        <section className="header_container">
          <Header />
        </section>

        <section className="presentation_container">
          <Presentation />
        </section>

        <section className="services_container">
          <Services />
        </section>
      </div>

      <section className="products_container">
        <Products />
      </section>

      <section className="recipes_container">
        <Carousel />
      </section>

      <section className="about-us_container">
        <About />
      </section>

      <section className="footer_container">
        <Footer />
      </section>
    </main>
  );
}

export default Home;
