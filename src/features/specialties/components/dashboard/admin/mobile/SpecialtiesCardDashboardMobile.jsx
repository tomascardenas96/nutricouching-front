import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteProduct from "../../../../../products/hooks/useDeleteProduct";
import "./SpecialtiesCardDashboardMobile.css";

function SpecialtiesCardDashboardMobile({
  specialty,
  setSpecialties,
  handleOpen,
}) {
  const { deleteProduct, closeModal, openModal, isModalOpen } =
    useDeleteProduct(setSpecialties);

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
              onClick={() => openModal(specialty?.specialtyId)}
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={deleteProduct}
            onClose={closeModal}
            message="¿Desea eliminar este producto?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default SpecialtiesCardDashboardMobile;
