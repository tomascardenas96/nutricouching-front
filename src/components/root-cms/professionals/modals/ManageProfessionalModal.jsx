import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import useGetSpecialtiesByQuery from "../../../../hooks/useGetSpecialtiesByQuery";
import useGetUsersByQuery from "../../../../hooks/useGetUsersByQuery";
import "./ManageProfessionalModal.css";
import ScheduleProfessionalForm from "./sections/schedule/ScheduleProfessionalForm";
import UserToProfessionalForm from "./sections/select-user/UserToProfessionalForm";
import SpecialtyProfessionalForm from "./sections/specialty/SpecialtyProfessionalForm";
import useAddNewSpecialty from "../../../../hooks/useAddNewSpecialty";
import { useEffect } from "react";

function ManageProfessionalModal({
  handleManageProfessionalsModal,
  professionals,
  professionalsError,
  professionalsLoading,
  setProfessionals,
}) {
  const closeModal = () => {
    handleManageProfessionalsModal();
    localStorage.removeItem("new-specialties");
  };

  const {
    handleChangeUserInputUsersByQuery,
    userInputGetUsersByQuery,
    usersByQuery,
    usersByQueryError,
    usersByQueryLoading,
    handleSelectUserAndCloseModal,
    selectedUser,
    handleUnselectUser,
  } = useGetUsersByQuery();

  const {
    handleChangeSpecialtiesUserInput,
    specialties,
    specialtiesUserInput,
    specialtiesLoading,
    specialtiesError,
    selectedSpecialties,
    handleSelectSpecialty,
    handleUnselectSpecialty,
    setSpecialties,
    setSelectedSpecialties,
    setSpecialtiesUserInput,
  } = useGetSpecialtiesByQuery();

  const {
    handleChangeCreateSpecialty,
    handleCloseAddSpecialtyModal,
    handleOpenAddSpecialtyModal,
    handleSubmitCreateSpecialty,
    isModalAddSpecialtyOpen,
  } = useAddNewSpecialty(
    setSpecialties,
    setSelectedSpecialties,
    setSpecialtiesUserInput
  );

  return (
    <section className="manage-professional-modal_container">
      <form className="manage-professional-modal">
        {/* Titulo del formulario */}
        <div className="manage-professional_title">
          <h1>ABM de profesionales</h1>
          <IoMdClose
            className="manage-professional_modal-close"
            onClick={handleManageProfessionalsModal}
          />
        </div>

        {/* Inputs del formulario */}
        <div className="manage-professional_items-container">
          <div className="manage-professional_list">
            <UserToProfessionalForm
              professionals={professionals}
              professionalsError={professionalsError}
              professionalsLoading={professionalsLoading}
              handleChangeUserInputUsersByQuery={
                handleChangeUserInputUsersByQuery
              }
              userInputGetUsersByQuery={userInputGetUsersByQuery}
              usersByQuery={usersByQuery}
              usersByQueryError={usersByQueryError}
              usersByQueryLoading={usersByQueryLoading}
              setProfessionals={setProfessionals}
              handleSelectUserAndCloseModal={handleSelectUserAndCloseModal}
              selectedUser={selectedUser}
              handleUnselectUser={handleUnselectUser}
            />
          </div>

          <div className="manage-professional_specialty">
            <SpecialtyProfessionalForm
              handleChangeSpecialtiesUserInput={
                handleChangeSpecialtiesUserInput
              }
              specialtiesUserInput={specialtiesUserInput}
              specialties={specialties}
              specialtiesLoading={specialtiesLoading}
              specialtiesError={specialtiesError}
              handleSelectSpecialty={handleSelectSpecialty}
              handleUnselectSpecialty={handleUnselectSpecialty}
              selectedSpecialties={selectedSpecialties}
              setSpecialties={setSpecialties}
              handleChangeCreateSpecialty={handleChangeCreateSpecialty}
              handleCloseAddSpecialtyModal={handleCloseAddSpecialtyModal}
              handleOpenAddSpecialtyModal={handleOpenAddSpecialtyModal}
              handleSubmitCreateSpecialty={handleSubmitCreateSpecialty}
              isModalAddSpecialtyOpen={isModalAddSpecialtyOpen}
              setSelectedSpecialties={setSelectedSpecialties}
            />
          </div>

          <div className="manage-professional_schedules">
            <ScheduleProfessionalForm />
          </div>
        </div>

        {/* Botones del formulario */}
        <div className="manage-professional_accept-cancel">
          <ImCross
            className="add-cancel-professional add-cancel-professional_close"
            onClick={closeModal}
          />
          <ImCheckmark className="add-cancel-professional add-cancel-professional_done  " />
        </div>
      </form>
    </section>
  );
}

export default ManageProfessionalModal;
