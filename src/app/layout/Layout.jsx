import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowBack } from "react-icons/io";
import { io } from "socket.io-client";
import { toast, Toaster } from "sonner";
import { WEBSOCKET_HOST } from "../../api/data";
import RootCmsModal from "../../features/admin/components/RootCmsModal";
import { useAuthUser } from "../../features/auth/hooks/useAuthUser";
import CartModal from "../../features/cart/components/CartModal";
import { useActiveCart } from "../../features/cart/hooks/useActiveCart";
import { useCartItems } from "../../features/cart/hooks/useCartItems";
import AdminCmsModal from "../../features/professional/components/AdminCmsModal";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
import NotificationPopUp from "./Notifications/NotificationPopUp";
import SubMenu from "./Sub-menu/SubMenu";

function Layout({ children }) {
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAdminCmsOpen, setIsAdminCmsOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  // Custom hooks para iniciar sesion y obtener el usuario activo
  const { user } = useAuthUser();

  // Productos y viandas agregadas al carrito desde el local storage.
  const { setElementsInCart } = useCartItems();
  const { activeCart, setActiveCart } = useActiveCart();

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

  // Abrir o cerrar el modal para actualizar un usuario
  const handleOpenUpdateUserModal = () => {
    setIsUpdateUserModalOpen(!isUpdateUserModalOpen);
  };

  // Notificacion cuando la compra es exitosa y creacion de carrito nuevo
  useEffect(() => {
    if (!user || !activeCart) {
      return;
    }

    const socket = io(`${WEBSOCKET_HOST}`, {
      query: { userId: user.userId },
    });

    socket.on("sendNewCart", (data) => {
      setActiveCart(data);
    });

    socket.on("afterPurchaseNotify", (data) => {
      if (data.service === "cart") {
        setIsCartModalOpen(false);
        switch (data.status) {
          case "rejected":
            toast.error(data.message);
            break;

          case "approved":
            toast.success(data.message);
            setElementsInCart([]);
            break;

          case "pending":
            toast.info(data.message);
            break;
        }
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
              activeCart={activeCart}
            />,
            document.body
          )}

        {/* Este div contiene la pantalla principal para que su height sea del 100svh */}
        <div className="main-screen_container">
          <section className="header_container">
            <Header
              handleCartModal={handleCartModal}
              activeCart={activeCart}
              setActiveCart={setActiveCart}
              setIsNotificationsModalOpen={setIsNotificationsModalOpen}
              isUpdateUserModalOpen={isUpdateUserModalOpen}
              setIsUpdateUserModalOpen={setIsUpdateUserModalOpen}
              handleCmsModal={handleCmsModal}
              handleAdminCmsModal={handleAdminCmsModal}
              handleOpenUpdateUserModal={handleOpenUpdateUserModal}
            />
          </section>

          <section className="sub-menu_container">
            <SubMenu />
          </section>

          {children}

          <Toaster />

          <section className="footer_container">
            <Footer />
          </section>
        </div>
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
        createPortal(
          <NotificationPopUp
            isNotificationsModalOpen={isNotificationsModalOpen}
            setIsNotificationsModalOpen={setIsNotificationsModalOpen}
            user={user}
          />,
          document.body
        )}
    </main>
  );
}

export default Layout;
