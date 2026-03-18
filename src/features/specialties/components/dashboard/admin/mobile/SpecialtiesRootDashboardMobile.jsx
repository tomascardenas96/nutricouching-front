import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllSpecialties from "../../../../hooks/useGetAllSpecialties";
import useSelectSpecialty from "../../../../hooks/useSelectSpecialty";
import useSpecialtyModals from "../../../../hooks/useSpecialtyModals";
import CreateSpecialtyModal from "../modals/CreateSpecialtyModal";
import ModifySpecialtyRootModal from "../modals/ModifySpecialtyRootModal";
import SpecialtiesCardDashboardMobile from "./SpecialtiesCardDashboardMobile";
import "./SpecialtiesRootDashboardMobile.css";

function SpecialtiesRootDashboardMobile() {
  const { specialties, setSpecialties, errorSpecialties, loadingSpecialties } =
    useGetAllSpecialties();
  const { selectSpecialty, selectedSpecialty } = useSelectSpecialty();
  const { searchTerm } = useSelectMenuOption();

  const {
    isModifySpecialtyModalOpen,
    handleCloseModifyModal,
    handleOpenModifyModal,
    handleAddSpecialtyModal,
    isAddSpecialtyModalOpen,
  } = useSpecialtyModals(selectSpecialty);

  const filtered = searchTerm
    ? specialties.filter((s) => {
        const q = searchTerm.toLowerCase();
        return (
          s.name?.toLowerCase().includes(q) ||
          s.category?.name?.toLowerCase().includes(q)
        );
      })
    : specialties;

  return (
    <>
      <div className="specialties-root-dashboard_mobile-container">
        <div className="specialties-root-dashboard-mobile">
          {errorSpecialties ? (
            <p className="error">Ha ocurrido un error</p>
          ) : loadingSpecialties ? (
            <DashboardListSkeleton />
          ) : filtered.length > 0 ? (
            <div className="split-specialties-card">
              {filtered.map((specialty) => (
                <SpecialtiesCardDashboardMobile
                  key={`specialty-${specialty.specialtyId}`}
                  specialty={specialty}
                  setSpecialties={setSpecialties}
                  handleOpenModifyModal={handleOpenModifyModal}
                />
              ))}
            </div>
          ) : (
            <p className="no-specialties">
              {searchTerm ? "Sin resultados para la búsqueda" : "No hay especialidades aún"}
            </p>
          )}
        </div>

        {!errorSpecialties && !loadingSpecialties && (
          <div className="add-specialty_btn" onClick={handleAddSpecialtyModal}>
            <button>Agregar especialidad</button>
          </div>
        )}
      </div>

      {isModifySpecialtyModalOpen &&
        createPortal(
          <ModifySpecialtyRootModal
            selectedSpecialty={selectedSpecialty}
            setSpecialties={setSpecialties}
            handleCloseModifyModal={handleCloseModifyModal}
          />,
          document.getElementById("root-portal")
        )}

      {isAddSpecialtyModalOpen &&
        createPortal(
          <CreateSpecialtyModal
            closeModal={handleAddSpecialtyModal}
            setSpecialties={setSpecialties}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default SpecialtiesRootDashboardMobile;
