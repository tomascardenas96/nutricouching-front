import { createPortal } from "react-dom";
import { HOST } from "../../../../../api/data";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteProfessional from "../../../hooks/useDeleteProfessional";
import useGetProfessionals from "../../../hooks/useGetProfessionals";
import useModifyProfessional from "../../../hooks/useModifyProfessional";
import useProfessionalModals from "../../../hooks/useProfessionalModals";
import useSelectProfessional from "../../../hooks/useSelectProfessional";
import "./ProfessionalsRootDashboard.css";
import ModifyProfessionalModal from "./modals/ModifyProfessionalModal";

function ProfessionalsRootDashboard() {
  const { professionals, setProfessionals } = useGetProfessionals();
  const { selectedProfessional, handleSelectProfessional } =
    useSelectProfessional();

  const {
    isModifyProfessionalModalOpen,
    handleOpenModifyModal,
    handleCloseModifyModal,
    isDeleteProfessionalModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useProfessionalModals(handleSelectProfessional);

  const { handleDeleteProfessional } = useDeleteProfessional(
    setProfessionals,
    selectedProfessional,
    handleCloseDeleteModal
  );

  const {
    handleChangeModifyProfessional,
    handleSubmitModifyProfessional,
    modifyProfessionalInputs,
  } = useModifyProfessional(
    selectedProfessional,
    setProfessionals,
    handleCloseModifyModal
  );

  return (
    <>
      <table className="professionals-root-dashboard_table">
        <thead>
          <tr>
            <th className="image-column"></th>
            <th>Nombre Completo</th>
            <th className="email-column">E-mail</th>
            <th className="phone-column">Telefono</th>
            <th className="role-column">Rol</th>
            <th className="options-column">Opciones</th>
          </tr>
        </thead>

        <tbody>
          {professionals.map((professional) => (
            <tr
              className="dashboard_professional-item"
              key={`professional-${professional.professionalId}`}
            >
              <td className="image-row">
                <div>
                  <img
                    src={`${HOST}/uploads/professionals/profile/${professional.profile.picture}`}
                    alt="fotos de los profesionales en el dashboard root"
                  />
                </div>
              </td>
              <td>{professional.fullname}</td>
              <td className="email-row">{professional.email}</td>
              <td className="phone-row">{professional.phone}</td>
              <td className="role-row">{professional.role}</td>
              <td className="options-row">
                <p
                  className="edit"
                  onClick={() => handleOpenModifyModal(professional)}
                >
                  Editar
                </p>
                <p
                  className="delete"
                  onClick={() => handleOpenDeleteModal(professional)}
                >
                  Eliminar
                </p>
              </td>
              <td className="divider-line_container">
                <hr className="divider-line" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModifyProfessionalModalOpen &&
        createPortal(
          <ModifyProfessionalModal
            handleChangeModifyProfessional={handleChangeModifyProfessional}
            handleSubmitModifyProfessional={handleSubmitModifyProfessional}
            modifyProfessionalInputs={modifyProfessionalInputs}
            handleCloseModifyModal={handleCloseModifyModal}
          />,
          document.getElementById("root")
        )}

      {isDeleteProfessionalModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteProfessional}
            onClose={handleCloseDeleteModal}
            message="¿Desea quitar el profesional?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default ProfessionalsRootDashboard;
