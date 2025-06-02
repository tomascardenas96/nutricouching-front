import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteSpecialty from "../../../hooks/useDeleteSpecialty";
import useGetAllSpecialties from "../../../hooks/useGetAllSpecialties";
import useSelectSpecialty from "../../../hooks/useSelectSpecialty";
import useSpecialtyModals from "../../../hooks/useSpecialtyModals";
import "./SpecialtiesRootDashboard.css";
import ModifySpecialtyRootModal from "./modals/ModifySpecialtyRootModal";

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
  } = useSpecialtyModals(selectSpecialty);
  const { handleDeleteSpecialty } = useDeleteSpecialty(setSpecialties, handleCloseDeleteModal);

  return (
    <>
      <table className="specialties-root-dashboard_table">
        <thead>
          <tr>
            <th>Descripcion</th>
            <th className="service-column">Servicio</th>
            <th className="options-column">Opciones</th>
          </tr>
        </thead>

        <tbody>
          {specialties?.map((specialty) => (
            <tr
              className="dashboard_specialty-item"
              key={`specialty-${specialty.specialtyId}`}
            >
              <td>{specialty.name}</td>
              <td className="service-row">{specialty.service.title}</td>
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
