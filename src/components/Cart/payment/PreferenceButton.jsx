import { SiMercadopago } from "react-icons/si";
import useCreatePreferenceMP from "../../../hooks/useCreatePreferenceMP";
import "./PreferenceButton.css";
import { toast } from "sonner";

function PreferenceButton({
  productsInCart,
  activeCart,
  user,
  handleCartModal,
  handleLoginModal,
}) {
  const { handleCreatePreference, preferenceLoading } = useCreatePreferenceMP(
    productsInCart,
    activeCart
  );

  const handleVerifyUserBeforePurchase = () => {
    if (user) {
      handleCreatePreference(productsInCart);
    } else {
      toast.warning("Necesitas iniciar sesion antes de realizar la compra");
      handleCartModal();
      handleLoginModal();
    }
  };

  return (
    <>
      {user ? (
        <button
          onClick={handleVerifyUserBeforePurchase}
          disabled={preferenceLoading}
          className={
            preferenceLoading ? "loading-purchase" : "confirm-purchase"
          }
        >
          {preferenceLoading ? "Generando pago..." : "Realizar compra"}
          <SiMercadopago className="cart-option_icons mercado-pago_icon" />
        </button>
      ) : (
        <button
          onClick={handleVerifyUserBeforePurchase}
          disabled={preferenceLoading}
          className={
            preferenceLoading ? "loading-purchase" : "confirm-purchase"
          }
        >
          {preferenceLoading ? "Generando pago..." : "Realizar compra"}
          <SiMercadopago className="cart-option_icons mercado-pago_icon" />
        </button>
      )}
    </>
  );
}

export default PreferenceButton;
