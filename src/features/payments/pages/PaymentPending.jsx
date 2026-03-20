import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import "./PaymentResult.css";

function PaymentPending() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");

  useEffect(() => {
    const detail = paymentId ? `Pago #${paymentId}` : "Tu pago";
    toast.info(`${detail} está pendiente de confirmación. Te notificaremos cuando se acredite.`);
  }, []);

  return (
    <div className="pr">
      <Helmet>
        <title>Pago pendiente | Nutricoaching</title>
      </Helmet>

      {/* Panel izquierdo — oscuro */}
      <div className="pr__dark pr__dark--pending">
        <span className="pr__symbol pr__symbol--pending" aria-hidden="true">
          …
        </span>
        <span className="pr__side-label">pago en proceso</span>
      </div>

      {/* Panel derecho — claro */}
      <div className="pr__light">
        <div className="pr__content">
          <span className="pr__eyebrow pr__eyebrow--pending">Pago pendiente</span>

          <h1 className="pr__title pr__title--pending">
            Estamos<br />
            <em>procesando.</em>
          </h1>

          <p className="pr__description">
            {paymentId && <>Pago <strong>#{paymentId}</strong><br /></>}
            Tu pago está siendo verificado.<br />
            Te notificaremos cuando se confirme.
          </p>

          <Link to="/" className="pr__btn pr__btn--pending">
            Volver al inicio
          </Link>
        </div>

        <div className="pr__circle pr__circle--pending" aria-hidden="true" />
      </div>
    </div>
  );
}

export default PaymentPending;
