import { createPortal } from "react-dom";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/hooks/useAuth";
import "./MoreInfo.css";
import ReservationModal from "./ReservationModal";

function MoreInfo({
  title,
  handleOpenServiceModal,
  handleOpenRequestReservation,
  selectedService,
  setIsRequestReservationOpen,
  isRequestReservationOpen,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const openLoginModal = () => {
    toast.warning("Necesitas iniciar sesion antes de reservar turnos");
    handleOpenServiceModal();
    navigate("/login");
  };

  return (
    <div
      className="services_more-info_container"
      onClick={handleOpenServiceModal}
    >
      <div className="services_more-info" onClick={(e) => e.stopPropagation()}>
        
      </div>

      {/* Modal para seleccionar un turno */}
      {isRequestReservationOpen &&
        createPortal(
          <ReservationModal
            handleOpenRequestReservation={handleOpenRequestReservation}
            selectedService={selectedService}
            setIsRequestReservationOpen={setIsRequestReservationOpen}
          />,
          document.body
        )}
    </div>
  );
}

export default MoreInfo;
