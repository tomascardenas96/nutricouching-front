import { SiMercadopago } from "react-icons/si";
import useCreatePreferenceMP from "../../../hooks/useCreatePreferenceMP";
import "./PreferenceButton.css";

function PreferenceButton({ productsInCart, user }) {
  const { handleCreatePreference, preferenceLoading } = useCreatePreferenceMP(
    productsInCart,
    user
  );

  return (
    <>
      {user ? (
        <button
          onClick={() => handleCreatePreference(productsInCart)}
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
          onClick={() => handleCreatePreference(productsInCart)}
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
