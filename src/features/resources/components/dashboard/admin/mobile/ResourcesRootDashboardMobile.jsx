import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllResources from "../../../../hooks/useGetAllResources";
import useHandleResourcesModals from "../../../../hooks/useHandleResourceModals";
import NewResourceModal from "../modals/NewResourceModal";
import UpdateResourceModal from "../modals/UpdateResourceModal";
import ResourcesCardDashboardMobile from "./ResourcesCardDashboardMobile";
import "./ResourcesRootDashboardMobile.css";

function ResourcesRootDashboardMobile() {
  const [selectedResource, setSelectedResource] = useState(null);
  const { setResources, flattedResources, resourcesError, resourcesLoading } =
    useGetAllResources();
  const { searchTerm } = useSelectMenuOption();

  const {
    isAddResourceModalOpen,
    isModifyResourceModalOpen,
    handleAddResourceModal,
    openModifyResourceModal,
    closeModifyResourceModal,
  } = useHandleResourcesModals(setSelectedResource);

  const filtered = searchTerm
    ? flattedResources.filter((r) =>
        r.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : flattedResources;

  return (
    <>
      <div className="resources-root-dashboard_mobile-container">
        <div className="resources-root-dashboard-mobile">
          {resourcesError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : resourcesLoading ? (
            <DashboardListSkeleton />
          ) : filtered.length > 0 ? (
            <div className="split-resources-card">
              {filtered.map((resource) => (
                <ResourcesCardDashboardMobile
                  key={`resource-${resource.resourceId}`}
                  resource={resource}
                  setResources={setResources}
                  openModifyResourceModal={openModifyResourceModal}
                />
              ))}
            </div>
          ) : (
            <p className="no-resources">
              {searchTerm ? "Sin resultados para la búsqueda" : "No hay recursos aún"}
            </p>
          )}
        </div>

        {!resourcesError && !resourcesLoading && (
          <div className="add-resource_btn" onClick={handleAddResourceModal}>
            <button>Agregar recurso</button>
          </div>
        )}
      </div>

      {isModifyResourceModalOpen &&
        createPortal(
          <UpdateResourceModal
            selectedResource={selectedResource}
            setResources={setResources}
            closeModifyResourceModal={closeModifyResourceModal}
          />,
          document.getElementById("root-portal")
        )}

      {isAddResourceModalOpen &&
        createPortal(
          <NewResourceModal
            setResources={setResources}
            handleAddResourceModal={handleAddResourceModal}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default ResourcesRootDashboardMobile;
