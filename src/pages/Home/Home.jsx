import { useState } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowBack } from "react-icons/io";
import About from "../../components/About/About";
import CartModal from "../../components/Cart/CartModal";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Presentation from "../../components/Presentation/Presentation";
import Products from "../../components/Products/Products";
import Carousel from "../../components/Recipes/Carousel";
import Services from "../../components/Services/Services";
import AdminCmsModal from "../../components/admin-cms/AdminCmsModal";
import NotificationPopUp from "../../components/notifications/NotificationPopUp";
import RootCmsModal from "../../components/root-cms/RootCmsModal";
import ElementsInCartProvider from "../../context/ElementsInCartProvider";
import { useActiveCart, useUser } from "../../context/UserProvider";
import "./Home.css";

function Home() {
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAdminCmsOpen, setIsAdminCmsOpen] = useState(false);

  // Productos y viandas agregadas al carrito desde el local storage.
  const [productsInCart, setProductsInCart] = useState([]);
  const [viandsInCart, setViandsInCart] = useState([]);

  // Custom hooks
  const { user } = useUser();
  const { activeCart } = useActiveCart();

  // Abrir / cerrar modal ROOT
  const handleCmsModal = () => {
    setIsCmsModalOpen(!isCmsModalOpen);
  };

  // Abrir / cerrar modal ADMIN
  const handleAdminCmsModal = () => {
    setIsAdminCmsOpen(!isAdminCmsOpen);
  };

  // Abrir / cerrar modal carrito
  const handleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <main>
      {/* Contexto elementos en el carrito */}
      <ElementsInCartProvider
        user={user}
        activeCart={activeCart}
        productsInCart={productsInCart}
        viandsInCart={viandsInCart}
        setProductsInCart={setProductsInCart}
        setViandsInCart={setViandsInCart}
      >
        {/* Carrito de compras */}
        {isCartModalOpen &&
          createPortal(
            <CartModal
              handleCartModal={handleCartModal}
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
              viandsInCart={viandsInCart}
              setViandsInCart={setViandsInCart}
              user={user}
            />,
            document.body
          )}

        {/* Este div contiene la pantalla principal para que su height sea del 100svh */}
        <div className="main-screen_container">
          <section className="header_container">
            <Header
              handleCartModal={handleCartModal}
              setProductsInCart={setProductsInCart}
              setViandsInCart={setViandsInCart}
              user={user}
              productsInCart={productsInCart}
              viandsInCart={viandsInCart}
            />
          </section>

          <section className="presentation_container">
            <Presentation />
          </section>

          <section className="services_container">
            <Services />
          </section>
        </div>

        <section className="products_container">
          <Products setProductsInCart={setProductsInCart} />
        </section>

        <section className="recipes_container">
          <Carousel setViandsInCart={setViandsInCart} />
        </section>
      </ElementsInCartProvider>

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

      {(user?.professional?.role === "root" ||
        user?.professional?.role === "admin") && (
        <section className="admin-cms-flap_container">
          <p onClick={handleAdminCmsModal}>ADMIN</p>
        </section>
      )}

      {isAdminCmsOpen &&
        createPortal(
          <AdminCmsModal handleAdminCmsModal={handleAdminCmsModal} />,
          document.body
        )}

      {user &&
        !user?.professional &&
        createPortal(<NotificationPopUp />, document.body)}
    </main>
  );
}

export default Home;
