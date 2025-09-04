import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast, Toaster } from "sonner";
import { WEBSOCKET_HOST } from "../../api/data";
import { useAuthUser } from "../../features/auth/hooks/useAuthUser";
import CartModal from "../../features/cart/components/CartModal";
import { useActiveCart } from "../../features/cart/hooks/useActiveCart";
import { useCartItems } from "../../features/cart/hooks/useCartItems";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import "./Layout.css";
import SubMenu from "./subMenu/SubMenu";

function Layout({ children }) {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  // Custom hooks para iniciar sesion y obtener el usuario activo
  const { user } = useAuthUser();

  // Productos y viandas agregadas al carrito desde el local storage.
  const { setElementsInCart } = useCartItems();
  const { activeCart, setActiveCart } = useActiveCart();

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
        {isCartModalOpen && (
          <CartModal
            handleCartModal={handleCartModal}
            activeCart={activeCart}
          />
        )}

        {/* Este div contiene la pantalla principal para que su height sea del 100svh */}
        <section className="header_container">
          <Header
            handleCartModal={handleCartModal}
            activeCart={activeCart}
            setActiveCart={setActiveCart}
            setIsNotificationsModalOpen={setIsNotificationsModalOpen}
            isUpdateUserModalOpen={isUpdateUserModalOpen}
            setIsUpdateUserModalOpen={setIsUpdateUserModalOpen}
            handleOpenUpdateUserModal={handleOpenUpdateUserModal}
          />
        </section>

        <section className="sub-menu_container">
          <SubMenu />
        </section>

        {children}
        <Toaster
          toastOptions={{
            style: { height: "2.9rem", paddingLeft: ".9rem", gap: ".7rem" },
          }}
        />

        <section className="footer_container">
          <Footer />
        </section>

        {/* {user && (
          <NotificationPopUp
            isNotificationsModalOpen={isNotificationsModalOpen}
            setIsNotificationsModalOpen={setIsNotificationsModalOpen}
            user={user}
          />
        )} */}
      </section>
    </main>
  );
}

export default Layout;
