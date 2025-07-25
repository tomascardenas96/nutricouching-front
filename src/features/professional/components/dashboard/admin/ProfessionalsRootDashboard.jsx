import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteProfessional from "../../../hooks/useDeleteProfessional";
import useGetProfessionals from "../../../hooks/useGetProfessionals";
import useModifyProfessional from "../../../hooks/useModifyProfessional";
import useProfessionalModals from "../../../hooks/useProfessionalModals";
import useSelectProfessional from "../../../hooks/useSelectProfessional";
import "./ProfessionalsRootDashboard.css";
import ManageProfessionalModal from "./modals/ManageProfessionalModal";
import ModifyProfessionalModal from "./modals/ModifyProfessionalModal";

function ProfessionalsRootDashboard() {
  const {
    professionals,
    setProfessionals,
    professionalsLoading,
    professionalsError,
  } = useGetProfessionals();

  const { selectedProfessional, handleSelectProfessional } =
    useSelectProfessional();

  const {
    isModifyProfessionalModalOpen,
    handleOpenModifyModal,
    handleCloseModifyModal,
    isDeleteProfessionalModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isAddProfessionalModalOpen,
    handleAddProfessionalModal,
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
          {professionals?.length > 0 ? (
            professionals.map((professional) => (
              <tr
                className="dashboard_professional-item"
                key={`professional-${professional.professionalId}`}
              >
                <td className="image-row">
                  <div>
                    {professional?.profile?.picture ? (
                      <img
                        src={professional.profile.picture}
                        alt="fotos de los profesionales en el dashboard root"
                      />
                    ) : (
                      <img
                        src="/assets/no-pic.jpg"
                        alt="Profesional sin foto de perfil"
                      />
                    )}
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
            ))
          ) : (
            <tr>
              <th
                colSpan={6}
                style={{ textAlign: "center" }}
                className="no-professionals"
              >
                No hay profesionales aún.
              </th>
            </tr>
          )}
        </tbody>
      </table>

      <div
        className="add-professional_btn"
        onClick={handleAddProfessionalModal}
      >
        <button>Agregar profesional</button>
      </div>

      {isAddProfessionalModalOpen && (
        <ManageProfessionalModal
          handleManageProfessionalsModal={handleAddProfessionalModal}
          professionals={professionals}
          professionalsError={professionalsError}
          professionalsLoading={professionalsLoading}
          setProfessionals={setProfessionals}
        />
      )}

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
