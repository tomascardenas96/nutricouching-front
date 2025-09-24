import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteResource from "../../../../hooks/useDeleteResource";
import useHandleResourcesModals from "../../../../hooks/useHandleResourceModals";
import "./ResourcesCardDashboardMobile.css";

function ResourcesCardDashboardMobile({
  resource,
  setResources,
  openModifyResourceModal,
  setSelectedResource,
}) {
  const { handleDeleteResource } = useDeleteResource(setResources);

  const {
    isDeleteResourceModalOpen,
    openDeleteResourceModal,
    closeDeleteResourceModal,
  } = useHandleResourcesModals(setSelectedResource);

  return (
    <>
      <div className="resource-card-dashboard-container">
        <div className="image-container">
          <img
            src={resource.image}
            alt="foto del recurso del dashboard superuser"
          />
        </div>

        <div className="info-container">
          <p className="name">
            {" "}
            <b>Nombre:</b>
            {resource.title}
          </p>

          <p>
            <b>Descripción:</b>
            {resource.description}
          </p>

          <p>
            <b>Precio:</b>$ {resource.price}
          </p>

          <div className="buttons-container">
            <button
              className="edit-btn"
              onClick={() => openModifyResourceModal(resource)}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => openDeleteResourceModal(resource.resourceId)}
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteResourceModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteResource}
            onClose={closeDeleteResourceModal}
            message="¿Desea eliminar este recurso?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default ResourcesCardDashboardMobile;
