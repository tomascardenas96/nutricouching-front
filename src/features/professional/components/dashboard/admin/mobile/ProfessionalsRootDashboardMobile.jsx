import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useGetProfessionals from "../../../../hooks/useGetProfessionals";
import useModifyProfessional from "../../../../hooks/useModifyProfessional";
import useProfessionalModals from "../../../../hooks/useProfessionalModals";
import useSelectProfessional from "../../../../hooks/useSelectProfessional";
import ManageProfessionalModal from "../modals/ManageProfessionalModal";
import ModifyProfessionalModal from "../modals/ModifyProfessionalModal";
import ProfessionalsCardDashboardMobile from "./ProfessionalsCardDashboardMobile";
import "./ProfessionalsRootDashboardMobile.css";

function ProfessionalsRootDashboardMobile() {
  const { professionals, setProfessionals, professionalsLoading, professionalsError } =
    useGetProfessionals();

  const { selectedProfessional, setSelectedProfessional } = useSelectProfessional();
  const { searchTerm } = useSelectMenuOption();

  const {
    isModifyProfessionalModalOpen, handleOpenModifyModal, handleCloseModifyModal,
    isAddProfessionalModalOpen, handleAddProfessionalModal,
  } = useProfessionalModals(setSelectedProfessional);

  const { handleSubmitModifyProfessional } = useModifyProfessional(
    selectedProfessional, setProfessionals, handleCloseModifyModal
  );

  const filtered = searchTerm
    ? professionals.filter((p) => {
        const q = searchTerm.toLowerCase();
        return (
          p.fullname?.toLowerCase().includes(q) ||
          p.email?.toLowerCase().includes(q) ||
          p.phone?.toLowerCase().includes(q)
        );
      })
    : professionals;

  return (
    <>
      <div className="professionals-root-dashboard_mobile-container">
        <div className="professionals-root-dashboard-mobile">
          {professionalsError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : professionalsLoading ? (
            <DashboardListSkeleton />
          ) : filtered.length > 0 ? (
            <div className="split-professionals-card">
              {filtered.map((professional) => (
                <ProfessionalsCardDashboardMobile
                  key={`professional-${professional.professionalId}`}
                  professional={professional}
                  setProfessionals={setProfessionals}
                  handleModifyProfessionalModalOpen={handleOpenModifyModal}
                />
              ))}
            </div>
          ) : (
            <p className="no-professionals">
              {searchTerm ? "Sin resultados para la búsqueda" : "No hay profesionales aún"}
            </p>
          )}

          {!professionalsError && !professionalsLoading && (
            <div className="add-professional_btn" onClick={handleAddProfessionalModal}>
              <button>Agregar profesional</button>
            </div>
          )}
        </div>
      </div>

      {isModifyProfessionalModalOpen &&
        createPortal(
          <ModifyProfessionalModal
            selectedProfessional={selectedProfessional}
            handleCloseModifyModal={handleCloseModifyModal}
            setProfessionals={setProfessionals}
          />,
          document.getElementById("root-portal")
        )}

      {isAddProfessionalModalOpen && (
        <ManageProfessionalModal
          handleManageProfessionalsModal={handleAddProfessionalModal}
          professionals={professionals}
          professionalsError={professionalsError}
          professionalsLoading={professionalsLoading}
          setProfessionals={setProfessionals}
        />
      )}
    </>
  );
}

export default ProfessionalsRootDashboardMobile;
