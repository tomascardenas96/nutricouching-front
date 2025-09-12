import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteProduct from "../../../../../products/hooks/useDeleteProduct";
import "./SpecialtiesCardDashboardMobile.css";
import useDeleteSpecialty from "../../../../hooks/useDeleteSpecialty";

function SpecialtiesCardDashboardMobile({
  specialty,
  setSpecialties,
  handleOpen,
  handleOpenDeleteModal,
  handleCloseDeleteModal,
  isDeleteSpecialtyModalOpen,
  selectedSpecialty,
}) {
  const { handleDeleteSpecialty } = useDeleteSpecialty(
    setSpecialties,
    handleCloseDeleteModal
  );

  return (
    <>
      <div className="product-card-dashboard-container">
        <div className="info-container">
          <p className="name">
            <b>Nombre:</b> {specialty?.name}
          </p>

          <div className="category">
            <p>
              <b>Categoria:</b>
              {specialty?.category?.name}
            </p>
          </div>

          <div className="buttons-container">
            <button className="edit-btn" onClick={() => handleOpen(specialty)}>
              <FaEdit /> Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => handleOpenDeleteModal(specialty?.specialtyId)}
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteSpecialtyModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={() => handleDeleteSpecialty(selectedSpecialty)}
            onClose={handleCloseDeleteModal}
            message="¿Desea eliminar esta especialidad?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default SpecialtiesCardDashboardMobile;
