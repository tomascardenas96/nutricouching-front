import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteProfessional from "../../../../hooks/useDeleteProfessional";
import "./ProfessionalsCardDashboardMobile.css";

function ProfessionalsCardDashboardMobile({
  selectedProfessional,
  professional,
  setProfessionals,
  handleModifyProfessionalModalOpen,
  closeModal,
  handleDeleteProfessionalModalOpen,
  handleCloseDeleteModal,
  isDeleteProfessionalModalOpen,
}) {
  const { handleDeleteProfessional } = useDeleteProfessional(
    setProfessionals,
    selectedProfessional,
    handleCloseDeleteModal
  );

  console.log(professional);

  return (
    <>
      <div className="professional-card-dashboard-container">
        <div className="image-container">
          <img
            src={professional.profile.picture}
            alt="foto del profesional del dashboard superuser"
          />
        </div>

        <div className="info-container">
          <p className="name">
            {" "}
            <b>Nombre:</b>
            {professional.fullname}
          </p>

          <p>
            <b>E-mail:</b>
            {professional.email}
          </p>
          <p>
            <b>Role:</b>
            {professional.role}
          </p>

          <div className="buttons-container">
            <button
              className="edit-btn"
              onClick={() => handleModifyProfessionalModalOpen(professional)}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="delete-btn"
              onClick={() =>
                handleDeleteProfessionalModalOpen(professional.professionalId)
              }
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteProfessionalModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteProfessional}
            onClose={closeModal}
            message="¿Desea eliminar este profesional?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default ProfessionalsCardDashboardMobile;
