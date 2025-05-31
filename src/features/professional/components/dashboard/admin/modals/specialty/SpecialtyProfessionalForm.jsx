import { createPortal } from "react-dom";
import SpecialtyDropdownNewProfessional from "./SpecialtyDropdownNewProfessional";
import "./SpecialtyProfessionalForm.css";
import { GrClose } from "react-icons/gr";
import AddSpecialtyNewProfessional from "./AddSpecialtyNewProfessional";

function SpecialtyProfessionalForm({
  handleChangeSpecialtiesUserInput,
  specialtiesUserInput,
  specialties,
  specialtiesLoading,
  specialtiesError,
  handleSelectSpecialty,
  handleUnselectSpecialty,
  selectedSpecialties,
  setSpecialties,
  handleChangeCreateSpecialty,
  handleCloseAddSpecialtyModal,
  handleOpenAddSpecialtyModal,
  handleSubmitCreateSpecialty,
  isModalAddSpecialtyOpen,
  setSelectedSpecialties,
}) {
  return (
    <div className="specialty-professional-form_container">
      <h1 className="manage-professional-modal_section-title">
        Especialidades:
        <span className="professionals-modal_required-field">*</span>
      </h1>

      <input
        type="text"
        placeholder="Selecciona una o mas especialidades"
        className="manage-professional-modal_section-input specialty-input"
        onChange={handleChangeSpecialtiesUserInput}
        value={specialtiesUserInput}
      />

      {selectedSpecialties?.length ? (
        <ul className="selected-specialties_card">
          {selectedSpecialties.map((specialty, idx) => (
            <li key={`selected-specialty-${specialty.name}-${idx}`}>
              {specialty.name}
              <GrClose
                className="delete-selected-specialty"
                onClick={() => handleUnselectSpecialty(specialty)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="professional-modal_no-selected-data">
          No hay especialidades seleccionadas
        </p>
      )}

      {specialtiesUserInput && (
        <SpecialtyDropdownNewProfessional
          specialties={specialties}
          specialtiesLoading={specialtiesLoading}
          specialtiesError={specialtiesError}
          handleSelectSpecialty={handleSelectSpecialty}
          handleUnselectSpecialty={handleUnselectSpecialty}
          setSpecialties={setSpecialties}
          handleChangeCreateSpecialty={handleChangeCreateSpecialty}
          handleCloseAddSpecialtyModal={handleCloseAddSpecialtyModal}
          handleOpenAddSpecialtyModal={handleOpenAddSpecialtyModal}
          handleSubmitCreateSpecialty={handleSubmitCreateSpecialty}
          isModalAddSpecialtyOpen={isModalAddSpecialtyOpen}
          setSelectedSpecialties={setSelectedSpecialties}
        />
      )}

      {isModalAddSpecialtyOpen &&
        createPortal(
          <AddSpecialtyNewProfessional
            handleCloseAddSpecialtyModal={handleCloseAddSpecialtyModal}
            handleChangeCreateSpecialty={handleChangeCreateSpecialty}
            handleOpenAddSpecialtyModal={handleOpenAddSpecialtyModal}
            handleSubmitCreateSpecialty={handleSubmitCreateSpecialty}
            isModalAddSpecialtyOpen={isModalAddSpecialtyOpen}
            setSelectedSpecialties={setSelectedSpecialties}
          />,
          document.body
        )}

      <hr className="professional-modal_divider-line" />
    </div>
  );
}

export default SpecialtyProfessionalForm;
