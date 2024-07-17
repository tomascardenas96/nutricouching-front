import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <main>
        <section className="header_container">
          <Header />
        </section>
        <section className="presentation_container">

        </section>
        <section className="idk_container"></section>
        <section className="footer_container">
          <Footer />
        </section>
      </main>
    </>
  );
}

export default App;
