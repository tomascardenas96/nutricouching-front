import "./MoreInfo.css";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { reviews } from "./reviews/reviews";
import { useUser } from "../../context/UserProvider";

function MoreInfo({
  handleOpenRequestReservation,
  title,
  handleOpenServiceModal,
  handleLoginModal,
}) {
  const { user } = useUser();

  const openLoginModal = () => {
    handleOpenServiceModal();
    handleLoginModal();
  };

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
          {title === "Coaching" ? (
            <>
              <p>{reviews[0]}</p>
              <br />
              <p>{reviews[1]}</p>
            </>
          ) : title === "Plan Inteligente" ? (
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
            <p>No hay descripcion para mostrar.</p>
          )}
        </div>

        <div className="service-modal_footer">
          <button
            onClick={user ? handleOpenRequestReservation : openLoginModal}
          >
            SOLICITAR TURNO <RiCalendarScheduleFill className="schedule-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
