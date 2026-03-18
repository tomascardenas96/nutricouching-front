import { memo, useState } from "react";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteResource from "../../../../hooks/useDeleteResource";
import "./ResourcesCardDashboardMobile.css";

const ResourcesCardDashboardMobile = memo(function ResourcesCardDashboardMobile({
  resource,
  setResources,
  openModifyResourceModal,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { handleDeleteResource } = useDeleteResource(setResources, resource.resourceId, () =>
    setIsDeleteModalOpen(false)
  );

  return (
    <>
      <div className="resource-card-dashboard-container">
        <div className="image-container">
          <img src={resource.image} alt="foto del recurso del dashboard superuser" />
        </div>

        <div className="info-container">
          <p className="name">{resource.title}</p>
          <p className="description">{resource.description}</p>
          <p className="price">{resource.price === 0 ? "FREE" : `$ ${resource.price}`}</p>

          <div className="buttons-container">
            <button className="edit-btn" onClick={() => openModifyResourceModal(resource)}>
              <FaEdit /> Editar
            </button>
            <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
              <MdDelete /> Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteResource}
            onClose={() => setIsDeleteModalOpen(false)}
            message="¿Desea eliminar este recurso?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
});

export default ResourcesCardDashboardMobile;
