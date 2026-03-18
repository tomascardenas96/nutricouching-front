import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption";
import useDeleteSpecialty from "../../../hooks/useDeleteSpecialty";
import useGetAllSpecialties from "../../../hooks/useGetAllSpecialties";
import useSelectSpecialty from "../../../hooks/useSelectSpecialty";
import useSpecialtyModals from "../../../hooks/useSpecialtyModals";
import CreateSpecialtyModal from "./modals/CreateSpecialtyModal";
import ModifySpecialtyRootModal from "./modals/ModifySpecialtyRootModal";
import "./SpecialtiesRootDashboard.css";

function SpecialtiesRootDashboard() {
  const { specialties, setSpecialties, errorSpecialties, loadingSpecialties } =
    useGetAllSpecialties();
  const { selectSpecialty, selectedSpecialty } = useSelectSpecialty();
  const { searchTerm } = useSelectMenuOption();

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

  const { handleDeleteSpecialty } = useDeleteSpecialty(setSpecialties, handleCloseDeleteModal);

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
      <div className="specialties-dashboard-container">
        {errorSpecialties ? (
          <p className="error">Ha ocurrido un error</p>
        ) : loadingSpecialties ? (
          <DashboardListSkeleton />
        ) : filtered.length ? (
          <table className="specialties-root-dashboard_table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Categoría</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((specialty) => (
                <tr
                  className="dashboard_specialty-item"
                  key={`specialty-${specialty.specialtyId}`}
                >
                  <td>{specialty.name}</td>
                  <td className="specialty-row">{specialty.category.name}</td>
                  <td className="options-row">
                    <p className="edit" onClick={() => handleOpenModifyModal(specialty)}>
                      Editar
                    </p>
                    <p className="delete" onClick={() => handleOpenDeleteModal(specialty)}>
                      Eliminar
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-specialties">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay especialidades aún"}
          </p>
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
          document.getElementById("root-portal")
        )}

      {isModifySpecialtyModalOpen &&
        createPortal(
          <ModifySpecialtyRootModal
            selectedSpecialty={selectedSpecialty}
            setSpecialties={setSpecialties}
            handleCloseModifyModal={handleCloseModifyModal}
          />,
          document.getElementById("root-portal")
        )}

      {isDeleteSpecialtyModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={() => handleDeleteSpecialty(selectedSpecialty.specialtyId)}
            onClose={handleCloseDeleteModal}
            message="¿Desea eliminar la especialidad?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default SpecialtiesRootDashboard;
