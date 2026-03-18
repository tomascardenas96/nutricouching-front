import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption";
import useDeleteProfessional from "../../../hooks/useDeleteProfessional";
import useGetProfessionals from "../../../hooks/useGetProfessionals";
import useModifyProfessional from "../../../hooks/useModifyProfessional";
import useProfessionalModals from "../../../hooks/useProfessionalModals";
import useSelectProfessional from "../../../hooks/useSelectProfessional";
import ManageProfessionalModal from "./modals/ManageProfessionalModal";
import ModifyProfessionalModal from "./modals/ModifyProfessionalModal";
import "./ProfessionalsRootDashboard.css";

const ROLE_LABELS = { admin: "Admin", professional: "Profesional", user: "Usuario" };

function ProfessionalsRootDashboard() {
  const { professionals, setProfessionals, professionalsLoading, professionalsError } =
    useGetProfessionals();

  const { selectedProfessional, setSelectedProfessional } = useSelectProfessional();
  const { searchTerm } = useSelectMenuOption();

  const {
    isModifyProfessionalModalOpen, handleOpenModifyModal, handleCloseModifyModal,
    isDeleteProfessionalModalOpen, handleOpenDeleteModal, handleCloseDeleteModal,
    isAddProfessionalModalOpen, handleAddProfessionalModal,
  } = useProfessionalModals(setSelectedProfessional);

  const { handleDeleteProfessional } = useDeleteProfessional(
    setProfessionals, selectedProfessional, handleCloseDeleteModal
  );

  const { handleSubmitModifyProfessional } = useModifyProfessional(
    selectedProfessional, setProfessionals, handleCloseModifyModal
  );

  const filtered = searchTerm
    ? professionals.filter((p) => {
        const q = searchTerm.toLowerCase();
        return (
          p.fullname?.toLowerCase().includes(q) ||
          p.email?.toLowerCase().includes(q) ||
          p.phone?.toLowerCase().includes(q)
        );
      })
    : professionals;

  return (
    <>
      <div className="professional-dashboard-container">
        {professionalsError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : professionalsLoading ? (
          <DashboardListSkeleton />
        ) : filtered.length > 0 ? (
          <table className="professionals-root-dashboard_table">
            <thead>
              <tr>
                <th className="avatar-column"></th>
                <th>Nombre Completo</th>
                <th className="email-column">E-mail</th>
                <th className="phone-column">Teléfono</th>
                <th className="role-column">Rol</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((professional) => (
                <tr
                  className="dashboard_professional-item"
                  key={`professional-${professional.professionalId}`}
                >
                  <td className="avatar-row">
                    {professional?.profile?.picture ? (
                      <img
                        src={professional.profile.picture}
                        alt={professional.fullname}
                        className="professional-avatar-img"
                      />
                    ) : (
                      <div className="professional-avatar">
                        {professional.fullname?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td>{professional.fullname}</td>
                  <td className="email-row">{professional.email}</td>
                  <td className="phone-row">{professional.phone}</td>
                  <td className="role-row">
                    <span className={`role-badge role-badge--${professional.role}`}>
                      {ROLE_LABELS[professional.role] ?? professional.role}
                    </span>
                  </td>
                  <td className="options-row">
                    <p className="edit" onClick={() => handleOpenModifyModal(professional)}>
                      Editar
                    </p>
                    <p className="delete" onClick={() => handleOpenDeleteModal(professional)}>
                      Eliminar
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-professionals">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay profesionales aún"}
          </p>
        )}

        {!professionalsLoading && !professionalsError && (
          <div className="add-professional_btn" onClick={handleAddProfessionalModal}>
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
          document.getElementById("root-portal")
        )}

      {isDeleteProfessionalModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteProfessional}
            onClose={handleCloseDeleteModal}
            message="¿Desea quitar el profesional?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default ProfessionalsRootDashboard;
