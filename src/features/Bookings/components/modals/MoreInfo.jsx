import { createPortal } from "react-dom";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { toast } from "sonner";
import { useAuthUser } from "../../../auth/hooks/useAuthUser";
import { useLoginModal } from "../../../auth/hooks/useLoginModal";
// import { reviews } from "../../../services/components/reviews/reviews";
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
  const { user } = useAuthUser();
  const { handleLoginModal } = useLoginModal();

  const openLoginModal = () => {
    toast.warning("Necesitas iniciar sesion antes de reservar turnos");
    handleOpenServiceModal();
    handleLoginModal();
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
