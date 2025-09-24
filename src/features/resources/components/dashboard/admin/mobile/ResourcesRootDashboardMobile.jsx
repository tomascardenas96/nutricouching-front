import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import useGetAllResources from "../../../../hooks/useGetAllResources";
import useHandleResourcesModals from "../../../../hooks/useHandleResourceModals";
import NewPlanModal from "../../../../../plans/components/dashboard/admin/modals/NewPlanModal";
import UpdatePlanModal from "../../../../../plans/components/dashboard/admin/modals/UpdatePlanModal";
import ResourcesCardDashboardMobile from "./ResourcesCardDashboardMobile";
import "./ResourcesRootDashboardMobile.css";
import UpdateResourceModal from "../modals/UpdateResourceModal";
import NewResourceModal from "../modals/NewResourceModal";

function ResourcesRootDashboardMobile() {
  const [selectedResource, setSelectedResource] = useState(null);

  const {
    isAddResourceModalOpen,
    isModifyResourceModalOpen,
    handleAddResourceModal,
    openModifyResourceModal,
    closeModifyResourceModal,
  } = useHandleResourcesModals(setSelectedResource);

  const { setResources, flattedResources, resourcesError, resourcesLoading } =
    useGetAllResources(setSelectedResource, null);

  return (
    <>
      <div className="resources-root-dashboard_mobile-container">
        <div className="resources-root-dashboard-mobile">
          {resourcesError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : resourcesLoading ? (
            <DashboardListSkeleton />
          ) : flattedResources?.length > 0 ? (
            <div className="split-resources-card">
              {flattedResources.map((resource) => (
                <ResourcesCardDashboardMobile
                  key={`resource-${resource.resourceId}`}
                  resource={resource}
                  setResources={setResources}
                  openModifyResourceModal={openModifyResourceModal}
                  setSelectedResource={setSelectedResource}
                />
              ))}
            </div>
          ) : (
            <p className="no-resources">No hay recursos aún</p>
          )}
        </div>

        {!resourcesError && !resourcesLoading && (
          <div className="add-product_btn" onClick={handleAddResourceModal}>
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
          document.body
        )}

      {isAddResourceModalOpen &&
        createPortal(
          <NewResourceModal
            setResources={setResources}
            handleAddResourceModal={handleAddResourceModal}
          />,
          document.body
        )}
    </>
  );
}

export default ResourcesRootDashboardMobile;
