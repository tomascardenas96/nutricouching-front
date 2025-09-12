import { useState } from "react";
import { createPortal } from "react-dom";
import useGetProfessionals from "../../../../hooks/useGetProfessionals";
import useHandleDashboardProfessionalsModals from "../../../../hooks/useHandleDashboardProfessionalsModals";
import ManageProfessionalModal from "../modals/ManageProfessionalModal";
import ModifyProfessionalModal from "../modals/ModifyProfessionalModal";
import ProfessionalsCardDashboardMobile from "./ProfessionalsCardDashboardMobile";
import "./ProfessionalsRootDashboardMobile.css";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function ProfessionalsRootDashboardMobile() {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const {
    professionals,
    professionalsLoading,
    professionalsError,
    setProfessionals,
  } = useGetProfessionals();

  const {
    handleAddProfessionalModal,
    handleModifyProfessionalModalOpen,
    handleModifyProfessionalModalClose,
    isAddProfessionalModalOpen,
    isModifyProfessionalModalOpen,
    handleDeleteProfessionalModalOpen,
    handleDeleteProfessionalModalClose,
    isDeleteProfessionalModalOpen,
  } = useHandleDashboardProfessionalsModals(setSelectedProfessional);

  return (
    <>
      <div className="professionals-root-dashboard_mobile-container">
        <div className="professionals-root-dashboard-mobile">
          {professionalsError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : professionalsLoading ? (
            <DashboardListSkeleton />
          ) : professionals?.length > 0 ? (
            <>
              <div className="split-professionals-card">
                {professionals?.map((professional) => (
                  <ProfessionalsCardDashboardMobile
                    key={`professional-${professional.professionalId}`}
                    professional={professional}
                    setProfessionals={setProfessionals}
                    handleModifyProfessionalModalOpen={
                      handleModifyProfessionalModalOpen
                    }
                    handleDeleteProfessionalModalOpen={
                      handleDeleteProfessionalModalOpen
                    }
                    isDeleteProfessionalModalOpen={
                      isDeleteProfessionalModalOpen
                    }
                    closeModal={handleDeleteProfessionalModalClose}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="no-professionals">No hay profesionales aún</p>
          )}

          {!professionalsError && !professionalsLoading && (
            <div
              className="add-professional_btn"
              onClick={handleAddProfessionalModal}
            >
              <button>Agregar profesional</button>
            </div>
          )}
        </div>
      </div>

      {isModifyProfessionalModalOpen &&
        createPortal(
          <ModifyProfessionalModal
            selectedProfessional={selectedProfessional}
            handleCloseModifyModal={handleModifyProfessionalModalClose}
            setProfessionals={setProfessionals}
          />,
          document.body
        )}

      {isAddProfessionalModalOpen &&
        createPortal(
          <ManageProfessionalModal
            handleManageProfessionalsModal={handleAddProfessionalModal}
            professionals={professionals}
            professionalsError={professionalsError}
            professionalsLoading={professionalsLoading}
            setProfessionals={setProfessionals}
          />,
          document.body
        )}
    </>
  );
}

export default ProfessionalsRootDashboardMobile;
