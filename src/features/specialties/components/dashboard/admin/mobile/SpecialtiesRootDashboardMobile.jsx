import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import useDeleteSpecialty from "../../../../hooks/useDeleteSpecialty";
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

  const {
    isModifySpecialtyModalOpen,
    handleCloseModifyModal,
    handleOpenModifyModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteSpecialtyModalOpen,
    handleAddSpecialtyModal,
    isAddSpecialtyModalOpen,
  } = useSpecialtyModals(selectSpecialty);

  return (
    <>
      <div className="products-root-dashboard_mobile-container">
        <div className="products-root-dashboard-mobile">
          {errorSpecialties ? (
            <p className="error">Ha ocurrido un error</p>
          ) : loadingSpecialties ? (
            <DashboardListSkeleton />
          ) : specialties?.length > 0 ? (
            <div className="split-products-card">
              {specialties.map((specialty) => (
                <SpecialtiesCardDashboardMobile
                  key={`specialty-${specialty.specialtyId}`}
                  specialty={specialty}
                  setSpecialties={setSpecialties}
                  handleOpen={handleOpenModifyModal}
                  handleOpenDeleteModal={handleOpenDeleteModal}
                  handleCloseDeleteModal={handleCloseDeleteModal}
                  isDeleteSpecialtyModalOpen={isDeleteSpecialtyModalOpen}
                  selectedSpecialty={selectedSpecialty}
                />
              ))}
            </div>
          ) : (
            <p className="no-specialties">No hay especialidades aún</p>
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
          document.body
        )}

      {isAddSpecialtyModalOpen &&
        createPortal(
          <CreateSpecialtyModal
            closeModal={handleAddSpecialtyModal}
            setSpecialties={setSpecialties}
          />,
          document.body
        )}
    </>
  );
}

export default SpecialtiesRootDashboardMobile;
