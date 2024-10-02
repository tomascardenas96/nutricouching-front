import "./MoreInfo.css";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { reviews } from "./reviews/reviews";

function MoreInfo({
  handleOpenRequestReservation,
  title,
  handleOpenServiceModal,
}) {
  return (
    <div
      className="services_more-info_container"
      onClick={handleOpenServiceModal}
    >
      <div className="services_more-info" onClick={(e) => e.stopPropagation()}>
        <div className="service-modal_header">
          <div>
            <h1>{title?.toUpperCase()}</h1>
            <p>Con LORENA ARLAN y NATASHA DIRIALDI</p>
          </div>
          <img src="/src/public/assets/tree-logo.png" alt="logo-service" />
        </div>

        <div className="service-modal_body">
          {title === "Coaching ontologico" ? (
            <>
              <p>{reviews[0]}</p>
              <br />
              <p>{reviews[1]}</p>
            </>
          ) : title === "Plan inteligente" ? (
            <>
              <p>{reviews[2]}</p>
              <br />
              <p>{reviews[3]}</p>
            </>
          ) : title === "Guia alimentaria personalizada" ? (
            <>
              <p>{reviews[4]}</p>
              <br />
              <p>{reviews[5]}</p>
            </>
          ) : title === "Asesoramiento continuo" ? (
            <>
              <p>{reviews[6]}</p>
              <br />
              <p>{reviews[7]}</p>
            </>
          ) : (
            <p>No hay servicios para mostrar.</p>
          )}
        </div>

        <div className="service-modal_footer">
          <button onClick={handleOpenRequestReservation}>
            SOLICITAR TURNO <RiCalendarScheduleFill className="schedule-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
