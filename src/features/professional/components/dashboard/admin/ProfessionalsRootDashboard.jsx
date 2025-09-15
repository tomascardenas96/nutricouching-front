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
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function ProfessionalsRootDashboard() {
  const {
    professionals,
    setProfessionals,
    professionalsLoading,
    professionalsError,
  } = useGetProfessionals();

  const { selectedProfessional, setSelectedProfessional } =
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
  } = useProfessionalModals(setSelectedProfessional);

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
      <div className="professional-dashboard-container">
        {professionalsError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : professionalsLoading ? (
          <DashboardListSkeleton />
        ) : professionals?.length > 0 ? (
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
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="no-professionals">No hay profesionales aún</p>
        )}

        {!professionalsLoading && !professionalsError && (
          <div
            className="add-professional_btn"
            onClick={handleAddProfessionalModal}
          >
            <button>Agregar profesional</button>
          </div>
        )}
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
            selectedProfessional={selectedProfessional}
            setProfessionals={setProfessionals}
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
