import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useAuth } from "../../features/auth/hooks/useAuth";
import CartModal from "../../features/cart/components/CartModal";
import { useActiveCart } from "../../features/cart/hooks/useActiveCart";
import { useCartItems } from "../../features/cart/hooks/useCartItems";
import { useSSEEvent } from "../../services/useSSEEvent";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import "./Layout.css";

const NO_FOOTER_ROUTES = ["/contact", "/success", "/failure", "/pending"];

function Layout({ children }) {
  const { pathname } = useLocation();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  // Custom hooks para iniciar sesion y obtener el usuario activo
  const { user } = useAuth();

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

  useSSEEvent("sendNewCart", (data) => {
    setActiveCart(data);
  });

  useSSEEvent("afterPurchaseNotify", (data) => {
    if (data.service !== "cart") return;
    switch (data.status) {
      case "rejected":
        setIsCartModalOpen(false);
        toast.error(data.message);
        break;
      case "approved":
        setIsCartModalOpen(false);
        toast.success(data.message);
        setElementsInCart([]);
        break;
      case "pending":
        toast.info("Tu pago está siendo procesado. Te notificaremos cuando se confirme.");
        break;
    }
  });

  return (
    <main>
      <div className="blur-background"></div>

      <Toaster
        toastOptions={{
          style: { height: "2.9rem", paddingLeft: ".9rem", gap: ".7rem" },
        }}
      />

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

        <div className="layout-content">{children}</div>

        {!NO_FOOTER_ROUTES.includes(pathname) && (
          <section className="footer_container">
            <Footer />
          </section>
        )}

        {/* {user && (
          <NotificationPopUp
            isNotificationsModalOpen={isNotificationsModalOpen}
            setIsNotificationsModalOpen={setIsNotificationsModalOpen}
          />
        )} */}
      </section>
    </main>
  );
}

export default Layout;
