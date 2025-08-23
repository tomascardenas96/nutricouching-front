import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteViand from "../../../../hooks/useDeleteViand";
import "./ViandsCardDashboardMobile.css";

function ViandsCardDashboardMobile({
  viand,
  setViands,
  handleModifyViandModalOpen,
}) {
  const {
    isDeleteViandModalOpen,
    openDeleteViandModal,
    closeDeleteViandModal,
    handleDeleteViand,
  } = useDeleteViand(setViands);

  return (
    <>
      <div className="product-card-dashboard-container">
        <div className="image-container">
          <img
            src={viand.image}
            alt="foto de vianda en el dashboard superuser"
          />
        </div>

        <div className="info-container">
          <p className="name">{viand.name}</p>

          <div className="stock-price">
            <p>
              <span>Stock:</span>
              {viand.stock}u
            </p>
            <p>
              <span>Precio:</span>$ {viand.price}
            </p>
          </div>

          <div className="buttons-container">
            <button
              className="edit-btn"
              onClick={() => handleModifyViandModalOpen(viand)}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => openDeleteViandModal(viand.viandId)}
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteViandModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteViand}
            onClose={closeDeleteViandModal}
            message="¿Desea eliminar esta vianda?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default ViandsCardDashboardMobile;
