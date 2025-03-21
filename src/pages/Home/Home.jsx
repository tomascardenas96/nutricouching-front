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
import MobileMenu from "../../components/Mobile-menu/MobileMenu";
import Presentation from "../../components/Presentation/Presentation";
import Products from "../../components/Products/Products";
import Carousel from "../../components/Recipes/Carousel";
import Services from "../../components/Services/Services";
import SubMenu from "../../components/Sub-menu/SubMenu";
import AdminCmsModal from "../../components/admin-cms/AdminCmsModal";
import NotificationPopUp from "../../components/notifications/NotificationPopUp";
import RootCmsModal from "../../components/root-cms/RootCmsModal";
import { useElementsInCart } from "../../context/ElementsInCartProvider";
import { useLogin, useUser } from "../../context/UserProvider";
import "./Home.css";

function Home() {
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAdminCmsOpen, setIsAdminCmsOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  // Custom hooks para iniciar sesion y obtener el usuario activo
  const {
    loginInput,
    loginLoading,
    loginError,
    handleSubmitLogin,
    handleChangeLogin,
    handleLoginModal,
    isLoginModalOpen,
  } = useLogin();
  const { user, userLoading, userError } = useUser();

  // Productos y viandas agregadas al carrito desde el local storage.
  const {
    activeCart,
    productsInCart,
    viandsInCart,
    setProductsInCart,
    setViandsInCart,
    elementsInCart,
    setElementsInCart,
    setActiveCart,
    hasSyncedCart,
  } = useElementsInCart();

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

  const handleChangeBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  // Abrir o cerrar el modal para actualizar un usuario
  const handleOpenUpdateUserModal = () => {
    setIsUpdateUserModalOpen(!isUpdateUserModalOpen);
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
              activeCart={activeCart}
              elementsInCart={elementsInCart}
              setElementsInCart={setElementsInCart}
              handleLoginModal={handleLoginModal}
            />,
            document.body
          )}

        {/* Este div contiene la pantalla principal para que su height sea del 100svh */}
        <div className="main-screen_container">
          <section className="header_container">
            <Header
              handleCartModal={handleCartModal}
              user={user}
              userLoading={userLoading}
              userError={userError}
              productsInCart={productsInCart}
              viandsInCart={viandsInCart}
              handleChangeBurgerMenu={handleChangeBurgerMenu}
              elementsInCart={elementsInCart}
              setProductsInCart={setProductsInCart}
              activeCart={activeCart}
              setViandsInCart={setViandsInCart}
              setElementsInCart={setElementsInCart}
              setActiveCart={setActiveCart}
              hasSyncedCart={hasSyncedCart}
              setIsNotificationsModalOpen={setIsNotificationsModalOpen}
              handleOpenUpdateUserModal={handleOpenUpdateUserModal}
              isUpdateUserModalOpen={isUpdateUserModalOpen}
              setIsUpdateUserModalOpen={setIsUpdateUserModalOpen}
            />
          </section>

          <section className="sub-menu_container">
            <SubMenu />
          </section>

          <section className="presentation_container">
            <Presentation />
          </section>

          <section className="services_container">
            <Services handleLoginModal={handleLoginModal} />
          </section>
        </div>

        <section className="products_container">
          <Products
            setProductsInCart={setProductsInCart}
            activeCart={activeCart}
            setElementsInCart={setElementsInCart}
          />
        </section>

        <section className="recipes_container">
          <Carousel
            setViandsInCart={setViandsInCart}
            activeCart={activeCart}
            setElementsInCart={setElementsInCart}
          />
        </section>

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
        createPortal(
          <NotificationPopUp
            isNotificationsModalOpen={isNotificationsModalOpen}
            setIsNotificationsModalOpen={setIsNotificationsModalOpen}
          />,
          document.body
        )}

      {isBurgerMenuOpen &&
        createPortal(
          <MobileMenu
            handleChangeBurgerMenu={handleChangeBurgerMenu}
            handleLoginModal={handleLoginModal}
            setActiveCart={setActiveCart}
            setElementsInCart={setElementsInCart}
            handleOpenUpdateUserModal={handleOpenUpdateUserModal}
          />,
          document.body
        )}
    </main>
  );
}

export default Home;
