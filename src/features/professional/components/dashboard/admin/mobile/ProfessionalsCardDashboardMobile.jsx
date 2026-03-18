import { memo } from "react";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteProfessional from "../../../../hooks/useDeleteProfessional";
import useProfessionalModals from "../../../../hooks/useProfessionalModals";
import "./ProfessionalsCardDashboardMobile.css";

const ROLE_LABELS = { admin: "Admin", professional: "Profesional", user: "Usuario" };

const ProfessionalsCardDashboardMobile = memo(function ProfessionalsCardDashboardMobile({
  professional,
  setProfessionals,
  handleModifyProfessionalModalOpen,
}) {
  const { selectedProfessional, setSelectedProfessional } = { selectedProfessional: null, setSelectedProfessional: () => {} };

  const {
    isDeleteProfessionalModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useProfessionalModals(setSelectedProfessional);

  const { handleDeleteProfessional } = useDeleteProfessional(
    setProfessionals,
    professional,
    handleCloseDeleteModal
  );

  return (
    <>
      <div className="professional-card-dashboard-container">
        <div className="image-container">
          {professional?.profile?.picture ? (
            <img
              src={professional.profile.picture}
              alt={professional.fullname}
            />
          ) : (
            <div className="professional-card__avatar">
              {professional.fullname?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="info-container">
          <div className="professional-card__header">
            <p className="name">{professional.fullname}</p>
            <span className={`role-badge role-badge--${professional.role}`}>
              {ROLE_LABELS[professional.role] ?? professional.role}
            </span>
          </div>

          <p className="email">{professional.email}</p>
          {professional.phone && <p className="phone">{professional.phone}</p>}

          <div className="buttons-container">
            <button
              className="edit-btn"
              onClick={() => handleModifyProfessionalModalOpen(professional)}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => handleOpenDeleteModal(professional)}
            >
              <MdDelete /> Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteProfessionalModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteProfessional}
            onClose={handleCloseDeleteModal}
            message="¿Desea eliminar este profesional?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
});

export default ProfessionalsCardDashboardMobile;
