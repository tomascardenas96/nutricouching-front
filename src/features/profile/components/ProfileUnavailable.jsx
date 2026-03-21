import { Link } from "react-router-dom";
import "./ProfileUnavailable.css";

function ProfileUnavailable() {
  return (
    <div className="pu-wrapper">
      <div className="pu-card">
        <div className="pu-icon-wrap">
          <span className="pu-icon">✕</span>
        </div>

        <p className="pu-eyebrow">Perfil no disponible</p>

        <h1 className="pu-title">
          Este perfil no<br />
          <em>está activo</em>
        </h1>

        <p className="pu-body">
          La cuenta de este profesional se encuentra temporalmente suspendida.
          Podés explorar otros profesionales disponibles en nuestra plataforma.
        </p>

        <div className="pu-actions">
          <Link to="/professionals" className="pu-btn pu-btn--primary">
            Ver profesionales
          </Link>
          <Link to="/" className="pu-btn pu-btn--ghost">
            Ir al inicio
          </Link>
        </div>
      </div>

      <div className="pu-bg-circle pu-bg-circle--1" />
      <div className="pu-bg-circle pu-bg-circle--2" />
    </div>
  );
}

export default ProfileUnavailable;
