import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowBack } from "react-icons/io";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { HOST } from "../../api/data";
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
import useGetElementsByCartId from "../../hooks/useGetElementsByCartId";
import "./Home.css";
import SubMenu from "../../components/Sub-menu/SubMenu";

function Home() {
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAdminCmsOpen, setIsAdminCmsOpen] = useState(false);

  // Custom hooks
  const { user } = useUser();
  const { activeCart, setActiveCart } = useActiveCart();

  // Productos y viandas agregadas al carrito desde el local storage.
  const [productsInCart, setProductsInCart] = useState([]);
  const [viandsInCart, setViandsInCart] = useState([]);

  // Productos y viandas agregadas al carrito desde la DB (usuario logueado)
  const { elementsInCart, setElementsInCart } = useGetElementsByCartId(
    user,
    activeCart,
    productsInCart,
    viandsInCart,
    setProductsInCart,
    setViandsInCart
  );

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

  // Notificacion cuando la compra es exitosa y creacion de carrito nuevo
  useEffect(() => {
    if (!user || !activeCart) {
      return;
    }

    const socket = io(`${HOST}`, {
      query: { userId: user.userId },
    });

    socket.on("sendNewCart", (data) => {
      setActiveCart(data);
    });

    socket.on("afterPurchaseNotify", (data) => {
      if (data.message === "Tu compra ha sido exitosa!") {
        handleCartModal();
        toast.success(data.message);
        setElementsInCart([]);
      } else if (
        data.message === "Tu compra ha sido rechazada, intente nuevamente"
      ) {
        handleCartModal();
        toast.error(data.message);
      } else if (
        data.message ===
        "Tu pago está en proceso, te notificaremos cuando se confirme."
      ) {
        handleCartModal();
        toast.info(data.message);
      }
    });

    return () => {
      socket.off("afterPurchaseNotify");
      socket.off("sendNewCart");
      socket.disconnect();
    };
  }, [user?.userId, activeCart]);

  return (
    <main>
      <div className="blur-background"></div>

      <section className="main-background">
        {/* Contexto elementos en el carrito */}
        <ElementsInCartProvider
          elementsInCart={elementsInCart}
          setElementsInCart={setElementsInCart}
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

            <section className="sub-menu_container">
              <SubMenu />
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
      </section>

      {(user?.professional?.role === "root" ||
        user?.professional?.role === "admin") && (
        <section className="admin-cms-flap_container">
          <p onClick={handleAdminCmsModal}>ADMIN</p>
        </section>
      )}

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
