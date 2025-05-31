import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";
import useDeleteProfessional from "../../../../../../hooks/useDeleteProfessional";
import ConfirmationModal from "../../../../../../../../common/components/ConfirmationModal";
import NewProfessionalAbmCard from "./NewProfessionalAbmCard";
import SelectedUserToMakeProfessional from "./SelectedUserToMakeProfessional";
import "./UserToProfessionalForm.css";

function UserToProfessionalForm({
  professionals,
  professionalsError,
  professionalsLoading,
  setProfessionals,
  handleChangeUserInputUsersByQuery,
  userInputGetUsersByQuery,
  usersByQuery,
  usersByQueryError,
  usersByQueryLoading,
  handleSelectUserAndCloseModal,
  selectedUser,
  handleUnselectUser,
}) {
  const {
    closeDeleteProfessionalModal,
    handleDeleteProfessional,
    isDeleteProfessionalModalOpen,
    openDeleteProfessionalModal,
  } = useDeleteProfessional(setProfessionals);

  return (
    <>
      <div className="professionals-list_modal">
        {professionals.map((professional) => (
          <NewProfessionalAbmCard
            key={`professional-${professional.professionalId}`}
            professional={professional}
            openDeleteProfessionalModal={openDeleteProfessionalModal}
          />
        ))}
      </div>

      <div className="professionals-list_assign-professional">
        <h1 className="manage-professional-modal_section-title">
          Designar un profesional:
          <span className="professionals-modal_required-field">*</span>
        </h1>
        <input
          type="text"
          placeholder="Buscar usuario por e-mail"
          className="manage-professional-modal_section-input"
          onChange={handleChangeUserInputUsersByQuery}
          value={userInputGetUsersByQuery}
        />

        {userInputGetUsersByQuery && (
          <div className="dropdown-menu_professional-form_users">
            {usersByQuery.length > 0 ? (
              usersByQuery.map((user) => (
                <SelectedUserToMakeProfessional
                  key={`usersbyquery_${user.userId}`}
                  user={user}
                  onClose={handleSelectUserAndCloseModal}
                />
              ))
            ) : (
              <p className="form_users-no-match">No hay coincidencias</p>
            )}
          </div>
        )}
      </div>

      {selectedUser ? (
        <div className="unselect-professional_manage-professionals">
          <SelectedUserToMakeProfessional
            key={`selecteduser-${selectedUser.userId}`}
            user={selectedUser}
          />
          <GrClose className="grclose" onClick={handleUnselectUser} />
        </div>
      ) : (
        <p className="professional-modal_no-selected-data">
          No hay ningun usuario seleccionado
        </p>
      )}

      {isDeleteProfessionalModalOpen &&
        createPortal(
          <ConfirmationModal
            isOpen={isDeleteProfessionalModalOpen}
            onClose={closeDeleteProfessionalModal}
            onConfirm={handleDeleteProfessional}
            message="¿Esta seguro que desea eliminar al profesional?"
          />,
          document.body
        )}

      <hr className="professional-modal_divider-line" />
    </>
  );
}

export default UserToProfessionalForm;
