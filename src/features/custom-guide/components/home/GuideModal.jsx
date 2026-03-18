import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import "./GuideModal.css";

function GuideModal({ setOpen }) {
  return (
    <div className="guide-overlay" onClick={() => setOpen(false)}>
      <div className="guide-modal" onClick={(e) => e.stopPropagation()}>

        <button className="guide-modal__close" onClick={() => setOpen(false)}>
          <IoMdClose />
        </button>

        <header className="guide-modal__header">
          <span className="guide-modal__eyebrow">Servicio personalizado</span>
          <h2 className="guide-modal__title">Guía Alimentaria Personalizada</h2>
          <p className="guide-modal__lead">
            Cada persona es única, por eso tu alimentación también debe serlo.
            Nuestros planes están diseñados para acompañarte de manera real,
            práctica y sostenible, respetando tu historia, tus gustos y tu
            estilo de vida.
          </p>
        </header>

        <div className="guide-modal__divider" />

        <section className="guide-modal__section">
          <h3 className="guide-modal__section-title">¿Cómo obtener tu plan?</h3>
          <ol className="guide-modal__steps">
            <li>
              <span className="guide-modal__step-num">01</span>
              <div>
                <strong>Reservá tu turno</strong> — consulta presencial en
                consultorio u online desde cualquier lugar, según el profesional
                elegido.
              </div>
            </li>
            <li>
              <span className="guide-modal__step-num">02</span>
              <div>
                <strong>Primera consulta</strong> — realizamos una anamnesis
                alimentaria, planteamos objetivos realistas y conversamos sobre
                tu entorno y hábitos.
              </div>
            </li>
            <li>
              <span className="guide-modal__step-num">03</span>
              <div>
                <strong>Recibís tu plan</strong> — lo enviamos a tu mail dentro
                de las 48 hs posteriores a la consulta.
              </div>
            </li>
          </ol>

          <Link
            className="guide-modal__cta"
            to="/professionals"
            onClick={() => setOpen(false)}
          >
            Ver profesionales de nutrición →
          </Link>
        </section>

        <div className="guide-modal__divider" />

        <section className="guide-modal__section">
          <h3 className="guide-modal__section-title">Beneficios del plan personalizado</h3>
          <ul className="guide-modal__benefits">
            <li>No es una dieta genérica: es un camino diseñado para tu contexto.</li>
            <li>Incluye educación alimentaria para que entiendas el porqué de cada elección.</li>
            <li>Te ayuda a organizar tu alimentación sin rigidez, con variedad de opciones.</li>
            <li>Acompañamiento físico, emocional y social.</li>
            <li>Se adapta tanto a objetivos clínicos como de bienestar.</li>
            <li>Es un proceso acompañado, cálido y profesional.</li>
          </ul>
        </section>

        <div className="guide-modal__divider" />

        <section className="guide-modal__section guide-modal__section--footer">
          <h3 className="guide-modal__section-title">Y después de tu plan...</h3>
          <p className="guide-modal__text">
            Podés agendar consultas de control para ajustar el plan según tu
            evolución. En Cohesiva no hablamos de "prohibidos" ni de planes
            imposibles de sostener — hablamos de hábitos reales, cambios
            sostenibles y un acompañamiento humano. Tu plan no se escribe a
            piedra: evoluciona con vos.
          </p>
        </section>

      </div>
    </div>
  );
}

export default GuideModal;
