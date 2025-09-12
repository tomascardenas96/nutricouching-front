import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteSpecialty from "../../../hooks/useDeleteSpecialty";
import useGetAllSpecialties from "../../../hooks/useGetAllSpecialties";
import useSelectSpecialty from "../../../hooks/useSelectSpecialty";
import useSpecialtyModals from "../../../hooks/useSpecialtyModals";
import "./SpecialtiesRootDashboard.css";
import ModifySpecialtyRootModal from "./modals/ModifySpecialtyRootModal";
import CreateSpecialtyModal from "./modals/CreateSpecialtyModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function SpecialtiesRootDashboard() {
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

  const { handleDeleteSpecialty } = useDeleteSpecialty(
    setSpecialties,
    handleCloseDeleteModal
  );

  return (
    <>
      <div className="specialties-dashboard-container">
        {errorSpecialties ? (
          <p className="error">Ha ocurrido un error</p>
        ) : loadingSpecialties ? (
          <DashboardListSkeleton />
        ) : specialties?.length ? (
          <>
            <table className="specialties-root-dashboard_table">
              <thead>
                <tr>
                  <th>Descripcion</th>
                  <th>Categoria</th>
                  <th className="options-column">Opciones</th>
                </tr>
              </thead>

              <tbody>
                {specialties.map((specialty) => (
                  <tr
                    className="dashboard_specialty-item"
                    key={`specialty-${specialty.specialtyId}`}
                  >
                    <td>{specialty.name}</td>
                    <td className="specialty-row">{specialty.category.name}</td>
                    <td className="options-row">
                      <p
                        className="edit"
                        onClick={() => handleOpenModifyModal(specialty)}
                      >
                        Editar
                      </p>
                      <p
                        className="delete"
                        onClick={() => handleOpenDeleteModal(specialty)}
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
          </>
        ) : (
          <p className="no-specialties">No hay especialidades aún</p>
        )}

        {!errorSpecialties && !loadingSpecialties && (
          <div className="add-specialty_btn" onClick={handleAddSpecialtyModal}>
            <button>Agregar especialidad</button>
          </div>
        )}
      </div>

      {isAddSpecialtyModalOpen &&
        createPortal(
          <CreateSpecialtyModal
            closeModal={handleAddSpecialtyModal}
            setSpecialties={setSpecialties}
          />,
          document.getElementById("root")
        )}

      {isModifySpecialtyModalOpen &&
        createPortal(
          <ModifySpecialtyRootModal
            selectedSpecialty={selectedSpecialty}
            setSpecialties={setSpecialties}
            handleCloseModifyModal={handleCloseModifyModal}
          />,
          document.getElementById("root")
        )}

      {isDeleteSpecialtyModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={() =>
              handleDeleteSpecialty(selectedSpecialty.specialtyId)
            }
            onClose={handleCloseDeleteModal}
            message="¿Desea eliminar la especialidad?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default SpecialtiesRootDashboard;
