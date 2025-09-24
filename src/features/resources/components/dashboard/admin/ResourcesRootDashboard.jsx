import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import useDeleteResource from "../../../hooks/useDeleteResource";
import useGetAllResources from "../../../hooks/useGetAllResources";
import useHandleResourcesModals from "../../../hooks/useHandleResourceModals";
import "./ResourcesRootDashboard.css";
import NewResourceModal from "./modals/NewResourceModal";
import UpdateResourceModal from "./modals/UpdateResourceModal";

function ResourcesRootDashboard() {
  const [selectedResource, setSelectedResource] = useState(null);
  const { flattedResources, setResources, resourcesLoading, resourcesError } =
    useGetAllResources();

  const {
    isAddResourceModalOpen,
    isModifyResourceModalOpen,
    isDeleteResourceModalOpen,
    handleAddResourceModal,
    openModifyResourceModal,
    closeModifyResourceModal,
    openDeleteResourceModal,
    closeDeleteResourceModal,
  } = useHandleResourcesModals(setSelectedResource);

  const { handleDeleteResource } = useDeleteResource(
    setResources,
    selectedResource,
    closeDeleteResourceModal
  );

  return (
    <>
      <div className="resources-dashboard-container">
        {resourcesError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : resourcesLoading ? (
          <DashboardListSkeleton />
        ) : flattedResources?.length > 0 ? (
          <table className="resources-root-dashboard_table">
            <thead>
              <tr>
                <th className="image-column"></th>
                <th>Titulo</th>
                <th className="description-column">Descripcion</th>
                <th className="short-column">Resumen</th>
                <th className="price-column">Precio</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>

            <tbody>
              {flattedResources?.map((resource) => (
                <tr
                  className="dashboard_resource-item"
                  key={`resource-${resource.resourceId}`}
                >
                  <td className="image-row">
                    <div>
                      <img
                        src={resource.image}
                        alt="imagen de recursos dashboard root"
                      />
                    </div>
                  </td>
                  <td>{resource.title}</td>
                  <td className="description-row">{resource.description}</td>
                  <td className="short-row">{resource.shortDescription}</td>
                  <td className="price-row">
                    {resource.price === 0 ? "FREE" : `$ ${resource.price}`}
                  </td>
                  <td className="options-row">
                    <p
                      className="edit"
                      onClick={() => openModifyResourceModal(resource)}
                    >
                      Editar
                    </p>
                    <p
                      className="delete"
                      onClick={() =>
                        openDeleteResourceModal(resource.resourceId)
                      }
                    >
                      Eliminar
                    </p>
                  </td>
                  <div className="divider-line_container">
                    <hr className="divider-line" />
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-resources">No hay recursos aún</p>
        )}

        {!resourcesLoading && !resourcesError && (
          <div className="add-resource_btn">
            <button onClick={handleAddResourceModal}>Agregar recurso</button>
          </div>
        )}
      </div>

      {isAddResourceModalOpen &&
        createPortal(
          <NewResourceModal
            setResources={setResources}
            handleAddResourceModal={handleAddResourceModal}
          />,
          document.getElementById("root")
        )}

      {isModifyResourceModalOpen &&
        createPortal(
          <UpdateResourceModal
            selectedResource={selectedResource}
            setResources={setResources}
            closeModifyResourceModal={closeModifyResourceModal}
          />,
          document.getElementById("root")
        )}

      {isDeleteResourceModalOpen &&
        createPortal(
          <ConfirmationModal
            message="¿Eliminar plan?"
            onConfirm={handleDeleteResource}
            onClose={closeDeleteResourceModal}
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default ResourcesRootDashboard;
