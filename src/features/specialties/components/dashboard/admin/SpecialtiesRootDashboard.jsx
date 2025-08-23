import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteSpecialty from "../../../hooks/useDeleteSpecialty";
import useGetAllSpecialties from "../../../hooks/useGetAllSpecialties";
import useSelectSpecialty from "../../../hooks/useSelectSpecialty";
import useSpecialtyModals from "../../../hooks/useSpecialtyModals";
import "./SpecialtiesRootDashboard.css";
import ModifySpecialtyRootModal from "./modals/ModifySpecialtyRootModal";
import CreateSpecialtyModal from "./modals/CreateSpecialtyModal";

function SpecialtiesRootDashboard() {
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
      <div className="specialties-desktop-dashboard">
        <table className="specialties-root-dashboard_table">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th className="options-column">Opciones</th>
            </tr>
          </thead>

          <tbody>
            {specialties?.length ? (
              specialties.map((specialty) => (
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
              ))
            ) : (
              <tr>
                <th
                  colSpan={6}
                  style={{ textAlign: "center" }}
                  className="no-specialties"
                >
                  No hay especialidades aún.
                </th>
              </tr>
            )}
          </tbody>
        </table>

        <div className="add-specialty_btn" onClick={handleAddSpecialtyModal}>
          <button>Agregar especialidad</button>
        </div>
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
            selectSpecialty={selectSpecialty}
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
