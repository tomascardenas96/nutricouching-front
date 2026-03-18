import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="nf">
      <Helmet>
        <title>404 — Página no encontrada | Cohesiva</title>
      </Helmet>

      {/* Panel izquierdo — oscuro */}
      <div className="nf__dark">
        <span className="nf__code" aria-hidden="true">404</span>
        <span className="nf__side-label">página no encontrada</span>
      </div>

      {/* Panel derecho — claro */}
      <div className="nf__light">
        <div className="nf__content">
          <span className="nf__eyebrow">Error 404</span>

          <h1 className="nf__title">
            Te<br />
            <em>perdiste.</em>
          </h1>

          <p className="nf__description">
            La página que buscás no existe<br />o fue movida a otro lugar.
          </p>

          <Link to="/" className="nf__btn">
            Volver al inicio
          </Link>
        </div>

        {/* Círculo decorativo */}
        <div className="nf__circle" aria-hidden="true" />
      </div>
    </div>
  );
}

export default NotFound;
