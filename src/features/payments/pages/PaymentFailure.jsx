import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import "./PaymentResult.css";

function PaymentFailure() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");

  useEffect(() => {
    const detail = paymentId ? `Pago #${paymentId} rechazado.` : "El pago fue rechazado.";
    toast.error(`${detail} Revisá los datos e intentá nuevamente.`);
  }, []);

  return (
    <div className="pr">
      <Helmet>
        <title>Pago rechazado | Nutricoaching</title>
      </Helmet>

      {/* Panel izquierdo — oscuro */}
      <div className="pr__dark pr__dark--failure">
        <span className="pr__symbol pr__symbol--failure" aria-hidden="true">
          !
        </span>
        <span className="pr__side-label">pago rechazado</span>
      </div>

      {/* Panel derecho — claro */}
      <div className="pr__light">
        <div className="pr__content">
          <span className="pr__eyebrow pr__eyebrow--failure">Pago rechazado</span>

          <h1 className="pr__title pr__title--failure">
            Algo salió<br />
            <em>mal.</em>
          </h1>

          <p className="pr__description">
            {paymentId && <>Pago <strong>#{paymentId}</strong><br /></>}
            No pudimos procesar tu pago. Revisá los datos<br />
            de tu tarjeta e intentá nuevamente.
          </p>

          <Link to="/" className="pr__btn pr__btn--failure">
            Volver al inicio
          </Link>
        </div>

        <div className="pr__circle pr__circle--failure" aria-hidden="true" />
      </div>
    </div>
  );
}

export default PaymentFailure;
