import "./App.css";
import Categories from "./components/Categories/Categories";
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
            <div className="decoration-line"></div>
          </section>

          <section className="categories_container">
            <Categories />
          </section>
        </div>

        <section className="services_container">
          <div className="decoration-line"></div>
          <Services />
        </section>

        <section className="recipes_container">
          <Carousel />
        </section>

        <section className="footer_container">
          <Footer />
        </section>
      </main>
    </>
  );
}

export default App;
