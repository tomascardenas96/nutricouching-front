import { createPortal } from "react-dom";
import useDeleteSpecialty from "../../../../hooks/useDeleteSpecialty";
import useGetAllSpecialties from "../../../../hooks/useGetAllSpecialties";
import useSelectSpecialty from "../../../../hooks/useSelectSpecialty";
import useSpecialtyModals from "../../../../hooks/useSpecialtyModals";
import CreateSpecialtyModal from "../modals/CreateSpecialtyModal";
import ModifySpecialtyRootModal from "../modals/ModifySpecialtyRootModal";
import SpecialtiesCardDashboardMobile from "./SpecialtiesCardDashboardMobile";
import "./SpecialtiesRootDashboardMobile.css";

function SpecialtiesRootDashboardMobile() {
  const { specialties, setSpecialties } = useGetAllSpecialties();
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

  const { handleDeleteSpecialty } = useDeleteSpecialty(
    setSpecialties,
    handleCloseDeleteModal
  );
  return (
    <>
      <div className="products-root-dashboard_mobile-container">
        <div className="products-root-dashboard-mobile">
          {specialties?.length > 0 ? (
            <div className="split-products-card">
              {specialties.map((specialty) => (
                <SpecialtiesCardDashboardMobile
                  key={`specialty-${specialty.specialtyId}`}
                  specialty={specialty}
                  setSpecialties={setSpecialties}
                  handleOpen={handleOpenModifyModal}
                />
              ))}
            </div>
          ) : (
            <tr>
              <th
                colSpan={5}
                style={{ textAlign: "center" }}
                className="no-specialties"
              >
                No hay especialidades aún.
              </th>
            </tr>
          )}
        </div>

        <div className="add-product_btn" onClick={handleAddSpecialtyModal}>
          <button>Agregar especialidad</button>
        </div>
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
            handleAddProductModal={handleAddSpecialtyModal}
            setSpecialties={setSpecialties}
          />,
          document.body
        )}
    </>
  );
}

export default SpecialtiesRootDashboardMobile;
