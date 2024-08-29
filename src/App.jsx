import "./App.css";
import About from "./components/About/About";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Presentation from "./components/Presentation/Presentation";
import Carousel from "./components/Recipes/Carousel";
import Services from "./components/Services/Services";

function App() {
  return (
    <>
      <main>
        <div className="main-screen_container">
          <section className="header_container">
            <Header />
          </section>

          <section className="presentation_container">
            <Presentation />
          </section>

          <section className="categories_container">
            <Services />
          </section>
        </div>

        <section className="services_container">
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
    </>
  );
}

export default App;
