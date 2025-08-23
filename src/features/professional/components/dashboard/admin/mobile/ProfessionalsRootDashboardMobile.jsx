import { useState } from "react";
import { createPortal } from "react-dom";
import useGetProfessionals from "../../../../hooks/useGetProfessionals";
import useHandleDashboardProfessionalsModals from "../../../../hooks/useHandleDashboardProfessionalsModals";
import ManageProfessionalModal from "../modals/ManageProfessionalModal";
import ModifyProfessionalModal from "../modals/ModifyProfessionalModal";
import ProfessionalsCardDashboardMobile from "./ProfessionalsCardDashboardMobile";
import "./ProfessionalsRootDashboardMobile.css";

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

  console.log(professionals);

  return (
    <>
      <div className="products-root-dashboard_mobile-container">
        <div className="products-root-dashboard-mobile">
          {professionals?.length > 0 ? (
            <div className="split-products-card">
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
                  isDeleteProfessionalModalOpen={isDeleteProfessionalModalOpen}
                  closeModal={handleDeleteProfessionalModalClose}
                />
              ))}
            </div>
          ) : (
            <tr>
              <th
                colSpan={5}
                style={{ textAlign: "center" }}
                className="no-products"
              >
                No hay profesionales aún.
              </th>
            </tr>
          )}
        </div>

        <div className="add-product_btn" onClick={handleAddProfessionalModal}>
          <button>Agregar profesional</button>
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
