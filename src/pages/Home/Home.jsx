import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Presentation from "../../components/Presentation/Presentation";
import Products from "../../components/Products/Products";
import Carousel from "../../components/Recipes/Carousel";
import Services from "../../components/Services/Services";
import RootCmsModal from "../../components/root-cms/RootCmsModal";
import { useUser } from "../../context/UserProvider";
import "./Home.css";
import { createPortal } from "react-dom";
import CartModal from "../../components/Cart/CartModal";

function Home() {
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { user } = useUser();

  const handleCmsModal = () => {
    setIsCmsModalOpen(!isCmsModalOpen);
  };

  const handleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <main>
      {/* Este div contiene la pantalla principal para que su height sea del 100svh */}
      <div className="main-screen_container">
        <section className="header_container">
          <Header handleCartModal={handleCartModal} />
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

      {user?.professional?.role === "root" && (
        <>
          {!isCmsModalOpen && (
            <section className="cms-flap_container" onClick={handleCmsModal}>
              <IoIosArrowBack />
            </section>
          )}

          {isCmsModalOpen && <RootCmsModal handleCmsModal={handleCmsModal} />}
        </>
      )}

      {isCartModalOpen &&
        createPortal(
          <CartModal handleCartModal={handleCartModal} />,
          document.body
        )}
    </main>
  );
}

export default Home;
