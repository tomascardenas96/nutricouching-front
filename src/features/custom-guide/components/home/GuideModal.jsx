import { Link } from "react-router-dom";
import "./GuideModal.css";

function GuideModal({ setOpen }) {
  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setOpen(false)}>
          ✖
        </button>

        <h2 className="modal-title">✨ Planes Personalizados Cohesiva</h2>

        <p className="modal-text">
          Cada persona es única, por eso tu alimentación también debe serlo. Los
          planes personalizados Cohesiva están diseñados para acompañarte de
          manera real, práctica y sostenible, respetando tu historia, tus gustos
          y tu estilo de vida.
        </p>

        <h3 className="modal-subtitle">🗓️ ¿Cómo obtener tu plan?</h3>
        <ol className="modal-list">
          <li>
            Reservá tu turno desde la web → consulta presencial en consultorio y
            online desde cualquier lugar, según el profesional elegido.
          </li>
          <li>
            <strong>Primera consulta:</strong> realizamos una anamnesis
            alimentaria, planteamos objetivos realistas y conversamos sobre tu
            entorno y hábitos.
          </li>
          <li>
            <strong>Diseño del plan:</strong> lo recibirás en tu mail dentro de
            las 48 horas posteriores a la consulta.
          </li>
        </ol>

        <div className="modal-link">
          <span>
            <Link to="/filter/professionals?category=nutricion">
              👉 Consulta los profesionales de la nutricion aqui
            </Link>
          </span>
        </div>

        <h3 className="modal-subtitle">
          🌟 Beneficios de un plan personalizado
        </h3>
        <ul className="modal-list">
          <li>
            No es una dieta genérica: es un camino diseñado para tu contexto.
          </li>
          <li>
            Incluye educación alimentaria, para que entiendas el porqué de cada
            elección.
          </li>
          <li>
            Te ayuda a organizar tu alimentación sin rigidez, con variedad de
            opciones.
          </li>
          <li>Acompañamiento físico, emocional y social.</li>
          <li>Se adapta tanto a objetivos clínicos como de bienestar.</li>
          <li>Es un proceso acompañado, cálido y profesional.</li>
        </ul>

        <p className="modal-text">
          👉 En Cohesiva no hablamos de “prohibidos” ni de planes imposibles de
          sostener. Hablamos de hábitos reales, cambios sostenibles y un
          acompañamiento humano.
        </p>

        <h3 className="modal-subtitle">📌 Y después de tu plan...</h3>
        <p className="modal-text">
          Podés agendar consultas de control para ajustar el plan según tu
          evolución. Todos los planes se adaptan a tu contexto familiar, laboral
          y social. Tu plan no se escribe a piedra: evoluciona con vos.
        </p>
      </div>
    </div>
  );
}

export default GuideModal;
