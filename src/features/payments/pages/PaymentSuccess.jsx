import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useCartItems } from "../../cart/hooks/useCartItems";
import { useProductCart } from "../../cart/hooks/useProductsCart";
import { useViandsCart } from "../../cart/hooks/useViandsCart";
import "./PaymentResult.css";

function PaymentSuccess() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");
  const orderId = params.get("merchant_order_id");

  const { setElementsInCart } = useCartItems();
  const { setProductsInCart } = useProductCart();
  const { setViandsInCart } = useViandsCart();

  useEffect(() => {
    // Vaciar carrito inmediatamente (el SSE sendNewCart lo actualiza en paralelo)
    setElementsInCart([]);
    setProductsInCart([]);
    setViandsInCart([]);
    localStorage.removeItem("products-cart");
    localStorage.removeItem("viands-cart");

    const detail = paymentId ? `Pago #${paymentId}` : orderId ? `Orden #${orderId}` : "Tu pago";
    toast.success(`${detail} fue aprobado. ¡Gracias por tu compra!`);
  }, []);

  return (
    <div className="pr">
      <Helmet>
        <title>Pago aprobado | Nutricoaching</title>
      </Helmet>

      {/* Panel izquierdo — oscuro */}
      <div className="pr__dark pr__dark--success">
        <span className="pr__symbol pr__symbol--success" aria-hidden="true">
          ✓
        </span>
        <span className="pr__side-label">pago aprobado</span>
      </div>

      {/* Panel derecho — claro */}
      <div className="pr__light">
        <div className="pr__content">
          <span className="pr__eyebrow pr__eyebrow--success">Pago aprobado</span>

          <h1 className="pr__title pr__title--success">
            Tu compra fue<br />
            <em>exitosa.</em>
          </h1>

          <p className="pr__description">
            {paymentId && <>Pago <strong>#{paymentId}</strong><br /></>}
            Recibiste una notificación con los detalles.<br />
            Revisá tu historial de compras cuando quieras.
          </p>

          <Link to="/" className="pr__btn pr__btn--success">
            Volver al inicio
          </Link>
        </div>

        <div className="pr__circle pr__circle--success" aria-hidden="true" />
      </div>
    </div>
  );
}

export default PaymentSuccess;
